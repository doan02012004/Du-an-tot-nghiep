import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/userModel.js";

export const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        if(order){
            const cart = await CartModel.findOne({userId:order.userId})
            cart.carts = [];
            cart.totalPrice = 0;
            cart.totalCart = 0;
            await cart.save()
            // Sử dụng userModel để tìm người dùng từ userId
            const user = await UserModel.findById(order.userId);  
            const userEmail = user?.email;
            if (userEmail) {
                // Gửi email xác nhận đơn hàng nếu có email
                const subject = "Xác nhận đơn hàng";
                const message = `Xin chào ${order.customerInfor.fullname || "Khách hàng"},\n\nCảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi. Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ sớm cập nhật trạng thái cho bạn.\n\nChi tiết đơn hàng:\nMã đơn hàng: ${order._id}\nTổng tiền: ${order.totalPrice}\n\nCảm ơn bạn đã tin tưởng!`;

                // Gửi email
                await sendEmail(userEmail, subject, message);
            } else {
                console.log("Không tìm thấy email người dùng");
            }
        }
        
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};  

export const getAllOrder = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng và populate thông tin người dùng và sản phẩm
        const Orders = await orderModel.find()
            .populate('userId', 'fullname email')  // Lấy thông tin cơ bản của người dùng
            .populate('items.productId', 'name price');  // Lấy thông tin cơ bản của sản phẩm

        // Trả về danh sách đơn hàng
        return res.status(StatusCodes.OK).json(Orders);
    } catch (error) {
        // Trả về lỗi nếu có vấn đề trong quá trình lấy đơn hàng
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getOrderById = async (req, res) => {
    const { orderId} = req.params;

    try {
        // Tìm đơn hàng theo ID và populate thông tin người dùng và sản phẩm
        const order = await orderModel.findById(orderId)
            .populate('userId', 'fullname email phone')
            .populate('items.productId', 'name price');

        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        }

        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const order = await orderModel.find({userId})

        console.log(order)    
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        }

        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Xóa đơn hàng theo ID
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        }

        return res.status(StatusCodes.OK).json({ message: "Order deleted successfully" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    // Kiểm tra trạng thái hợp lệ
    const validStatuses = ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received"];
    if (!validStatuses.includes(status)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid order status" });
    }

    // Cập nhật trạng thái đơn hàng
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('userId', 'email fullname');  // Lấy email và fullname từ userId

    if (!updatedOrder) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
    }

    // Kiểm tra email người dùng
    const userEmail = updatedOrder.userId.email;
    if (!userEmail) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Email not found for the user" });
    }

    const statusTranslations = {
        pending: "Chờ xử lý",
        unpaid: "Chưa thanh toán",
        confirmed: "Đã xác nhận",
        shipped: "Đang giao",
        delivered: "Đã giao hàng",
        cancelled: "Đã hủy",
        received: "Đã nhận hàng"
      };

    const vietnameseStatus = statusTranslations[status];

    // Gửi email cho khách hàng
    const subject = "Cập nhật trạng thái đơn hàng";
    const message = `Xin chào ${updatedOrder.customerInfor.fullname},\n\nĐơn hàng của bạn đã được cập nhật trạng thái: ${vietnameseStatus}. Cảm ơn bạn đã tin tưởng mua sắm tại cửa hàng chúng tôi!`;

    await sendEmail(userEmail, subject, message);

    // Trả về đơn hàng đã được cập nhật
    return res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

