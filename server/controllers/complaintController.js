import { StatusCodes } from "http-status-codes";
import complaintModel from "../models/complaintModel.js";
import orderModel from "../models/orderModel.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/userModel.js";

// Tạo khiếu nại cho đơn hàng
export const createComplaint = async (req, res) => {
    const { orderId, complaintReason } = req.body;

    try {
        // Kiểm tra xem đơn hàng có tồn tại không
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng" });
        }

        // Kiểm tra trạng thái đơn hàng, chỉ khi đơn hàng đã "received" mới cho phép khiếu nại
        if (order.status !== 'received' && order.status !== 'delivered' ) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bạn chỉ có thể nộp đơn khiếu nại khi nhận được đơn đặt hàng" });
        }

        // Tạo khiếu nại mới
        const complaint = await complaintModel.create({
            orderId,
            userId: order.userId,
            complaintReason,
            status: 'new', // Đặt trạng thái khiếu nại ban đầu là "new"
        });

        // Lấy thông tin người dùng từ order.userId
        const user = await UserModel.findById(order.userId);
        const userEmail = user?.email;
        console.log(user)

        if (userEmail) {
            // Gửi email thông báo đã nhận được khiếu nại
            const subject = "Thông báo khiếu nại đơn hàng";
            const message = `Xin chào ${user.firstname} ${user.lastname},\n\nChúng tôi đã nhận được khiếu nại của bạn liên quan đến đơn hàng ${order.orderNumber}. Chúng tôi sẽ xem xét và xử lý trong thời gian sớm nhất.\n\nCảm ơn bạn đã thông báo cho chúng tôi!`;

            // Gửi email cho khách hàng
            await sendEmail(userEmail, subject, message);
        }

        // Trả về thông tin khiếu nại đã được tạo
        return res.status(StatusCodes.CREATED).json(complaint);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy tất cả khiếu nại
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find().populate('orderId', 'orderNumber totalPrice').populate('userId', 'fullname email');

        return res.status(StatusCodes.OK).json(complaints);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy khiếu nại theo ID
export const getComplaintById = async (req, res) => {
    const { complaintId } = req.params;

    try {
        const complaint = await complaintModel.findById(complaintId)
            .populate('orderId', 'orderNumber totalPrice')
            .populate('userId', 'fullname email');

        if (!complaint) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Complaint not found" });
        }

        return res.status(StatusCodes.OK).json(complaint);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Cập nhật trạng thái khiếu nại
export const updateComplaintStatus = async (req, res) => {
    const { complaintId, status, response } = req.body;

    try {
        // Kiểm tra trạng thái hợp lệ của khiếu nại
        const validStatuses = ["new", "in_progress", "resolved","cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid complaint status" });
        }

        // Cập nhật khiếu nại
        const updatedComplaint = await complaintModel.findByIdAndUpdate(
            complaintId,
            { status, response },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Complaint not found" });
        }

        // Lấy thông tin người dùng
        const user = await UserModel.findById(updatedComplaint.userId);
        const userEmail = user?.email;
        const statusTranslations = {
            new: "Mới",
            in_progress: "Đang xử lý",
            resolved: "Đã giải quyết",
            cancelled: "Huỷ khiếu nại"
          };
    
        const vietnameseStatus = statusTranslations[updatedComplaint.status];
        const order = await orderModel.findById(updatedComplaint.orderId);  
        if (userEmail) {
            // Gửi email thông báo về trạng thái khiếu nại
            const subject = "Cập nhật khiếu nại của bạn";
            const message = `Xin chào ${user.firstname} ${user.lastname},\n\nChúng tôi muốn thông báo rằng khiếu nại của bạn về đơn hàng ${order.orderNumber} đã được cập nhật với trạng thái: ${vietnameseStatus}.\n\nTrả lời của chúng tôi: ${updatedComplaint.response}\n\nCảm ơn bạn đã thông báo cho chúng tôi!`;

            // Gửi email cho khách hàng
            await sendEmail(userEmail, subject, message);
        }

        // Trả về khiếu nại đã được cập nhật
        return res.status(StatusCodes.OK).json(updatedComplaint);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const cancelComplaint = async (req, res) => {
    const { complaintId } = req.params;

    try {
        // Tìm khiếu nại
        const complaint = await complaintModel.findById(complaintId);

        if (!complaint) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy khiếu nại" });
        }

        // Kiểm tra trạng thái
        if (complaint.status !== "new") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Chỉ có thể hủy khiếu nại khi trạng thái là 'Mới'" });
        }

        // Lấy thông tin người dùng
        const user = await UserModel.findById(complaint.userId);
        const userEmail = user?.email;

        // Xóa khiếu nại
        await complaintModel.findByIdAndDelete(complaintId);

        // Gửi email thông báo (nếu có email của khách hàng)
        if (userEmail) {
            const subject = "Xác nhận hủy khiếu nại";
            const message = `Xin chào ${user.firstname} ${user.lastname},\n\nKhiếu nại của bạn về đơn hàng ${complaint.orderId} đã được hủy thành công.\n\nNếu đây không phải thao tác của bạn, vui lòng liên hệ với chúng tôi ngay lập tức.\n\nTrân trọng,\nĐội ngũ hỗ trợ khách hàng.`;

            await sendEmail(userEmail, subject, message);
        }

        return res.status(StatusCodes.OK).json({ message: "Khiếu nại đã được hủy thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};