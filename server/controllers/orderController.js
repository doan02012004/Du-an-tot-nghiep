import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
import crypto from 'crypto';
import querystring from 'qs';
import dateFormat from 'dateformat';
import { formatDateToCustomString, sortObject } from '../ultil/payment.js';
import ProductModel from "../models/productModel.js";


export const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        if (order) {
            const cart = await CartModel.findOne({ userId: order.userId })
            cart.carts.map(async (item) => {
                const product = await ProductModel.findById(item.productId)
                product.attributes.map(async (attribute) => {
                    if (attribute._id == item.attributeId) {
                        attribute.instock = attribute.instock - item.quantity
                        await product.save()
                    }
                })
            })
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
    const { orderId } = req.params;

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
        const order = await orderModel.find({ userId })
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

//hàm thanh toán với VNPay
export const paymentVNPay = async (req, res) => {
    try {

        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // Thông tin cấu hình VNPay
        const tmnCode = "ML8JRUOJ";
        const secretKey = "TXA23XAHD604Z31OCUA3EKVP2PI5QOHA";
        const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const returnUrl = "http://localhost:5000/api/orders/payment/vnpay/return";
        const date = new Date();
        const createDate = dateFormat(date, 'yyyymmddHHmmss');
        const orderId = req.body.orderId;
        const amount = req.body.amount;
        const bankCode = "";
        const orderInfo = 'Thanh toan cho ma GD:' + orderId;
        const orderType = 'other';
        date.setMinutes(date.getMinutes() + 15);
        const expireDateFormat = formatDateToCustomString(date); // Định dạng thành yyyyMMddHHmmss
        let locale = "vn";
        if (!locale) locale = 'vn';

        const currCode = 'VND';
        console.log('ip', ipAddr)

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_ExpireDate'] = expireDateFormat;

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        // Sắp xếp các tham số
        vnp_Params = sortObject(vnp_Params);

        // Tạo chữ ký
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        // Tạo URL thanh toán
        const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

        // Chuyển hướng đến URL thanh toán
        return res.json({ paymentUrl });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


//huyển hướng lại trang của bạn với thông tin thanh toán
export const vnpayReturn = async (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const secretKey = 'TXA23XAHD604Z31OCUA3EKVP2PI5QOHA';
    const sortedParams = sortObject(vnp_Params);

    const queryString = querystring.stringify(sortedParams, { encode: false });
    const hash = crypto.createHmac('sha512', secretKey).update(queryString).digest('hex');
    if (hash === secureHash) {
        const orderNumber = vnp_Params['vnp_TxnRef']
        if (vnp_Params['vnp_ResponseCode'] === '00') {

            await orderModel.findOneAndUpdate({ orderNumber }, { status: "paid" })
            return res.redirect('http://localhost:5173/thanks');
        } else {
            await orderModel.findOneAndUpdate({ orderNumber }, { status: "cancelpayment" })
            return res.redirect('http://localhost:5173/order');
        }
    } else {
        return res.status(400).json({ message: 'Chữ ký không hợp lệ' });
    }
};

// IPn việc xác thực trạng thái của bill thanh toán khi thành công hay thất bại
export const vnpayIPN = async (req, res) => {
    try {
        const vnp_Params = req.query;

        // Lấy SecureHash từ request của VNPay và xóa các tham số không liên quan
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp các tham số còn lại
        const sortedParams = sortObject(vnp_Params);

        // Tạo hash từ tham số đã sắp xếp và so sánh với SecureHash của VNPay
        const secretKey = 'TXA23XAHD604Z31OCUA3EKVP2PI5QOHA';
        const queryString = querystring.stringify(sortedParams, { encode: false });
        const hash = crypto.createHmac('sha512', secretKey).update(queryString).digest('hex');

        if (hash !== secureHash) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Chữ ký không hợp lệ' });
        }

        // Lấy thông tin từ request
        const { vnp_TxnRef, vnp_ResponseCode, vnp_Amount } = vnp_Params;

        // Kiểm tra trạng thái giao dịch từ VNPay
        if (vnp_ResponseCode === '00') {
            // Giao dịch thành công, cập nhật trạng thái đơn hàng
            const updatedOrder = await orderModel.findOneAndUpdate(
                { orderNumber: vnp_TxnRef },
                { status: 'paid', paymentDate: new Date() },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy đơn hàng' });
            }

            // Gửi phản hồi thành công cho VNPay
            return res.status(StatusCodes.OK).json({ RspCode: '00', Message: 'Success' });
        } else {
            // Giao dịch thất bại, cập nhật trạng thái đơn hàng
            await orderModel.findOneAndUpdate(
                { orderNumber: vnp_TxnRef },
                { status: 'cancelpayment' }
            );

            // Gửi phản hồi thất bại cho VNPay
            return res.status(StatusCodes.OK).json({ RspCode: '00', Message: 'Success' });
        }
    } catch (error) {
        console.error('VNPay IPN Error:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ RspCode: '99', Message: 'lỗi không xác định' });
    }
};
