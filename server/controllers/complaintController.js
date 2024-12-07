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
            const message = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                    <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                </div>
                <h2 style="text-align: center; color: #FF0000;">📢 Thông báo khiếu nại đơn hàng 📢</h2>
                <p style="color: #555;">Xin chào <strong>${user.firstname} ${user.lastname}</strong>,</p>
                <p style="color: #555;">Chúng tôi đã nhận được khiếu nại của bạn liên quan đến đơn hàng <strong>${order.orderNumber}</strong> với lý do: <strong>${complaintReason}</strong>.</p>
                <p style="color: #555;">Chúng tôi sẽ xem xét và xử lý khiếu nại của bạn trong thời gian sớm nhất. Bạn sẽ nhận được thông báo khi chúng tôi có kết quả xử lý.</p>
                
                <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin đơn hàng</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #f0f0f0;">
                            <td style="color: #555; padding: 10px;">Mã đơn hàng:</td>
                            <td style="color: #000; padding: 10px;"><strong>${order.orderNumber}</strong></td>
                        </tr>
                        <tr>
                            <td style="color: #555; padding: 10px;">Ngày đặt hàng:</td>
                            <td style="color: #000; padding: 10px;">${new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
      
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #555;">Cảm ơn bạn đã thông báo cho chúng tôi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất nếu cần thêm thông tin.</p>
                    <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                </div>
      
                <div style="margin-top: 30px; text-align: center;">
                    <p style="color: #555;">Chúc bạn một ngày tuyệt vời và hẹn gặp lại trong những lần mua sắm tiếp theo!</p>
                </div>
              </div>
            `;
      
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
            const subject = "Cập nhật trạng thái khiếu nại của bạn";
            const message = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                        <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                    </div>
                    <h2 style="text-align: center; color: #FF0000;">📢 Cập nhật khiếu nại của bạn 📢</h2>
                    <p style="color: #555;">Xin chào <strong>${user.firstname} ${user.lastname}</strong>,</p>
                    <p style="color: #555;">Chúng tôi muốn thông báo rằng khiếu nại của bạn về đơn hàng <strong>${order.orderNumber}</strong> đã được cập nhật với trạng thái: <strong style="color: #FF0000;">${vietnameseStatus}</strong>.</p>
                    <p style="color: #555;">Trả lời của chúng tôi: <em>${updatedComplaint.response}</em></p>
                    
                    <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin khiếu nại</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="background-color: #f0f0f0;">
                                <td style="color: #555; padding: 10px;">Mã khiếu nại:</td>
                                <td style="color: #000; padding: 10px;"><strong>${updatedComplaint._id}</strong></td>
                            </tr>
                            <tr>
                                <td style="color: #555; padding: 10px;">Ngày khiếu nại:</td>
                                <td style="color: #000; padding: 10px;">${new Date(updatedComplaint.createdAt).toLocaleString()}</td>
                            </tr>
                            <tr style="background-color: #f0f0f0;">
                                <td style="color: #555; padding: 10px;">Trạng thái hiện tại:</td>
                                <td style="color: #FF0000; padding: 10px;"><strong>${vietnameseStatus}</strong></td>
                            </tr>
                            <tr>
                                <td style="color: #555; padding: 10px;">Lý do khiếu nại:</td>
                                <td style="color: #000; padding: 10px;">${updatedComplaint.complaintReason}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #555;">Chúng tôi xin chân thành cảm ơn bạn đã liên hệ và phản ánh vấn đề. Chúng tôi luôn nỗ lực để nâng cao chất lượng dịch vụ và mang lại sự hài lòng cho khách hàng. Nếu bạn cần thêm thông tin, vui lòng liên hệ chúng tôi qua:</p>
                        <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                    </div>

                    <div style="margin-top: 30px; text-align: center;">
                        <p style="color: #555;">Chúc bạn một ngày tuyệt vời và hẹn gặp lại trong những lần mua sắm tiếp theo!</p>
                    </div>
                </div>
            `;
  
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