import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
export const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        if(order){
            const cart = await CartModel.findOne({userId:order.userId})
            cart.carts = [];
            cart.totalPrice = 0;
            cart.totalCart = 0;
            await cart.save()
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
        // Kiểm tra xem trạng thái có hợp lệ không
        const validStatuses = ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received"];
        if (!validStatuses.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid order status" });
        }

        // Tìm và cập nhật trạng thái của đơn hàng
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Để trả về đơn hàng đã được cập nhật
        );

        if (!updatedOrder) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
        }

        return res.status(StatusCodes.OK).json(updatedOrder);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

