import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
import crypto from 'crypto';
import querystring from 'qs';
import dateFormat from 'dateformat';
import { formatDateToCustomString, sortObject } from '../ultil/payment.js';
import ProductModel from "../models/productModel.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/userModel.js";

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
            // Sử dụng userModel để tìm người dùng từ userId
            const user = await UserModel.findById(order.userId);
            const userEmail = user?.email;
            const voucher = order.voucher?.discountValue || 0; // Lấy giá trị voucher, nếu có
            const price = order.totalPrice - voucher; // Tính tổng không bao gồm phí ship
            if (userEmail) {
                if (order.paymentMethod === "cash") {
                    // Gửi email xác nhận đơn hàng nếu có email
                    const subject = "Xác nhận đơn hàng";
                    const message = `Xin chào ${order.customerInfor.fullname || "Khách hàng"},\n\nCảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi. Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ sớm cập nhật trạng thái cho bạn.\n\nChi tiết đơn hàng:\nMã đơn hàng: ${order.orderNumber}\nTổng tiền: ${price.toLocaleString()}₫\n\nCảm ơn bạn đã tin tưởng!`;

                    // Gửi email
                    await sendEmail(userEmail, subject, message);
                }
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
        // Kiểm tra trạng thái hợp lệ
        const validStatuses = ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received", "Returngoods", "Complaints", "Refunded", "Exchanged"];
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
            received: "Đã nhận hàng",
            Returngoods: "Trả hàng",
            Complaints: "Đang xử lý khiếu nại",
            //   Refunded:"Hoàn tiền",
            Exchanged: "Đổi trả hàng",
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
        const order = await orderModel.findOne({ orderNumber });

        if (!order) {
            console.error("Không tìm thấy đơn hàng cho orderNumber:", orderNumber);
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        // Lấy email từ UserModel dựa trên userId của đơn hàng
        const user = await UserModel.findById(order.userId);
        const userEmail = user?.email || ""; // Email của người dùng
        if (vnp_Params['vnp_ResponseCode'] === '00') {

            await orderModel.findOneAndUpdate({ orderNumber }, { status: "pending", paymentStatus: "Đã thanh toán" })
            // Gửi email xác nhận thanh toán thành công
            if (userEmail) {
                await sendEmail(
                    userEmail,
                    "Thanh toán thành công",
                    `Đơn hàng ${orderNumber} đã được thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!`
                );
            }
            return res.redirect('http://localhost:5173/thanks');
        } else {
            await orderModel.findOneAndUpdate({ orderNumber }, { status: "unpaid", paymentStatus: "Chưa thanh toán" })
            if (userEmail) {
                // Gửi email thông báo thanh toán thất bại
                await sendEmail(
                    userEmail,
                    "Thanh toán thất bại",
                    `Đơn hàng ${orderNumber} chưa được thanh toán. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.`
                );
            }
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
                { status: 'unpaid' }
            );

            // Gửi phản hồi thất bại cho VNPay
            return res.status(StatusCodes.OK).json({ RspCode: '00', Message: 'Success' });
        }
    } catch (error) {
        console.error('VNPay IPN Error:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ RspCode: '99', Message: 'lỗi không xác định' });
    }
};



// Hàm tạo liên kết thanh toán bằng VNPay cho đơn thanh toán lại
export const generateVNPayLink = async (order) => {
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const vnpTmnCode = 'ML8JRUOJ';
    const vnpHashSecret = 'TXA23XAHD604Z31OCUA3EKVP2PI5QOHA';
    const returnUrl = 'http://localhost:5000/api/orders/payment/vnpay/return'; // URL callback sau thanh toán

    const createDate = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const orderNumber = order.orderNumber;

    const params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: vnpTmnCode,
        vnp_Amount: order.totalPrice * 100, // Đơn vị: VND * 100
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderNumber, // Sử dụng orderNumber làm mã tham chiếu
        vnp_OrderInfo: `Thanh toan don hang ${orderNumber}`,
        vnp_OrderType: 'other',
        vnp_Locale: 'vn',
        vnp_ReturnUrl: returnUrl,
        vnp_CreateDate: createDate,
        vnp_IpAddr: '127.0.0.1',
    };

    // Sắp xếp các tham số
    const sortedParams = sortObject(params);

    const queryString = querystring.stringify(sortedParams, { encode: false });
    const signData = crypto
        .createHmac('sha512', vnpHashSecret)
        .update(queryString)
        .digest('hex');

    // Tạo URL thanh toán đầy đủ
    return `${vnpUrl}?${queryString}&vnp_SecureHash=${signData}`;
};

// thanh toán lại đơn hàng
export const initiatePayment = async (req, res) => {
    const { orderId } = req.params; // Lấy ID đơn hàng từ route params

    try {
        // 1. Tìm đơn hàng theo ID
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
        }

        // 2. Kiểm tra trạng thái đơn hàng
        if (order.status !== 'unpaid') {
            return res.status(400).json({ message: 'Đơn hàng đã được thanh toán hoặc bị hủy.' });
        }

        // 3. Tạo liên kết thanh toán bằng VNPay
        const paymentLink = await generateVNPayLink(order); // Hàm này sẽ được tạo ở bước 1.2

        res.status(200).json({ paymentLink }); // Trả về link thanh toán cho frontend
    } catch (error) {
        console.error('Lỗi khi xử lý thanh toán lại:', error);
        res.status(500).json({ message: 'Lỗi server khi xử lý thanh toán lại.' });
    }
};