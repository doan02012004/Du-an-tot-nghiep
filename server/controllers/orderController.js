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
            const user = await UserModel.findById(order.userId);
            const userEmail = user?.email || null;
            const voucher = order.voucher?.discountValue || 0;
            const shipPrice = order?.ship?.value?.price || 0;
            const price = order.totalPrice - shipPrice;
            const TotalAmount = voucher ? (order?.totalPrice - voucher?.discountValue) : order?.totalPrice;

            if (userEmail) {
                if (order.paymentMethod === "cash") {
                    const subject = "Xác nhận đơn hàng từ Fendi Shop";

                    const message = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                                <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                            </div>
                            <h2 style="text-align: center; color: #4CAF50;">🎉 Cảm ơn bạn đã đặt hàng! 🎉</h2>
                            <p style="color: #555;">Xin chào <strong>${order.customerInfor.fullname || "Khách hàng"}</strong>,</p>
                            <p style="color: #555;">Chúng tôi đã nhận được đơn hàng của bạn. Đơn hàng hiện đang được xử lý và sẽ sớm được giao đến bạn. Dưới đây là thông tin chi tiết:</p>
                            
                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin đơn hàng</h3>
                                <table style="width: 100%;">
                                    <tr>
                                        <td style="color: #555;">Mã đơn hàng:</td>
                                        <td style="color: #000;"><strong>${order.orderNumber}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Ngày đặt hàng:</td>
                                        <td style="color: #000;">${new Date(order.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Phương thức thanh toán:</td>
                                        <td style="color: #000;">Thanh toán khi nhận hàng</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Tổng tiền (chưa bao gồm phí ship):</td>
                                        <td style="color: #000;">${price.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Phí vận chuyển:</td>
                                        <td style="color: #000;">${shipPrice.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Mã giảm giá:</td>
                                        <td style="color: #000;">${voucher.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Tổng cộng:</td>
                                        <td style="color: #4CAF50; font-weight: bold;">${TotalAmount.toLocaleString()}₫</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin giao hàng</h3>
                                <p style="color: #555;">
                                    <strong>Người nhận:</strong> ${order.customerInfor.fullname}<br>
                                    <strong>Địa chỉ:</strong> ${order.customerInfor.address}, ${order.customerInfor.ward}, ${order.customerInfor.district}, ${order.customerInfor.city}<br>
                                    <strong>Số điện thoại:</strong> ${order.customerInfor.phone}
                                </p>
                            </div>

                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Chi tiết sản phẩm</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead>
                                        <tr style="background-color: #f0f0f0;">
                                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Hình ảnh</th>
                                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Tên sản phẩm</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Kích thước</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Màu sắc</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Số lượng</th>
                                            <th style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${order.items
                                            .map(
                                                (item) => `
                                                <tr>
                                                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
                                                        <img src="${item?.gallery?.avatar}" alt="${item.name}" style="max-width: 50px; border-radius: 5px;">
                                                    </td>
                                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item?.attribute?.color || "N/A"}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item?.attribute?.size || "N/A"}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                                                    <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toLocaleString()}₫</td>
                                                </tr>
                                            `
                                            )
                                            .join("")}
                                    </tbody>
                                </table>
                            </div>

                            <p style="text-align: center; font-size: 14px; color: #888;">Cảm ơn bạn đã tin tưởng và lựa chọn Fendi Shop! Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:</p>
                            <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                        </div>
                    `;

                    try {
                        await sendEmail(userEmail, subject, message);
                    } catch (emailError) {
                        console.error("Lỗi khi gửi email:", emailError);
                    }
                }
            } else {
                console.error("Không tìm thấy email người dùng");
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
    const { orderId, status, cancelReason } = req.body;
  
    try {
      // Kiểm tra trạng thái hợp lệ
      const validStatuses = ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"];
      if (!validStatuses.includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid order status" });
      }
  
      // Nếu trạng thái là "cancelled", kiểm tra xem lý do huỷ có tồn tại không
      if (status === "cancelled" && !cancelReason) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Cancel reason is required for cancelled orders" });
    }
    
    // Cập nhật trạng thái đơn hàng
    const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { status, cancelReason }, // Cập nhật lý do huỷ nếu có
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
          Returngoods:"Trả hàng",
          Complaints:"Đang xử lý khiếu nại",
        //   Refunded:"Hoàn tiền",
          Exchanged:"Đổi trả hàng",
        };
  
      const vietnameseStatus = statusTranslations[status];
      // Gửi email cho khách hàng
      const subject = "Cập nhật trạng thái đơn hàng";
  
      const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
            </div>
            <h2 style="text-align: center; color: #FF0000;">📢 Cập nhật trạng thái đơn hàng 📢</h2>
            <p style="color: #555;">Xin chào <strong>${updatedOrder.customerInfor.fullname}</strong>,</p>
            <p style="color: #555;">Chúng tôi muốn thông báo rằng đơn hàng <strong>${updatedOrder.orderNumber}</strong> của bạn đã được cập nhật trạng thái thành: <strong style="color: #FF0000;">${vietnameseStatus}</strong>.</p>
            
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin đơn hàng</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f0f0f0;">
                        <td style="color: #555; padding: 10px;">Mã đơn hàng:</td>
                        <td style="color: #000; padding: 10px;"><strong>${updatedOrder.orderNumber}</strong></td>
                    </tr>
                    <tr>
                        <td style="color: #555; padding: 10px;">Ngày đặt hàng:</td>
                        <td style="color: #000; padding: 10px;">${new Date(updatedOrder.createdAt).toLocaleString()}</td>
                    </tr>
                    <tr style="background-color: #f0f0f0;">
                        <td style="color: #555; padding: 10px;">Trạng thái hiện tại:</td>
                        <td style="color: #FF0000; padding: 10px;"><strong>${vietnameseStatus}</strong></td>
                    </tr>
                </table>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #555;">Cảm ơn bạn đã tin tưởng mua sắm tại Fendi Shop! Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
                <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <p style="color: #555;">Chúc bạn một ngày tuyệt vời và hẹn gặp lại trong những lần mua sắm tiếp theo!</p>
            </div>
        </div>
      `;
  
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





const successEmail = async (userEmail, orderNumber) => {
    const order = await orderModel.findOne({ orderNumber });
    if (!order) {
        return; // Nếu không tìm thấy đơn hàng, không làm gì thêm
    }

    const subject = "Thanh toán thành công";
    const voucher = order.voucher?.discountValue || 0;
    const shipPrice = order?.ship?.value?.price || 0;
    const price = order.totalPrice - shipPrice;
    const TotalAmount = voucher ? (order?.totalPrice - voucher?.discountValue) : order?.totalPrice;

    const message = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                                <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                            </div>
                            <h2 style="text-align: center; color: #4CAF50;">🎉 Cảm ơn bạn đã đặt hàng! 🎉</h2>
                            <p style="color: #555;">Xin chào <strong>${order.customerInfor.fullname || "Khách hàng"}</strong>,</p>
                            <p style="color: #555;">Chúng tôi đã nhận được đơn hàng của bạn. Đơn hàng hiện đang được xử lý và sẽ sớm được giao đến bạn. Dưới đây là thông tin chi tiết:</p>
                            
                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin đơn hàng</h3>
                                <table style="width: 100%;">
                                    <tr>
                                        <td style="color: #555;">Mã đơn hàng:</td>
                                        <td style="color: #000;"><strong>${order.orderNumber}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Ngày đặt hàng:</td>
                                        <td style="color: #000;">${new Date(order.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Phương thức thanh toán:</td>
                                        <td style="color: #000;">Thanh toán khi nhận hàng</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Tổng tiền (chưa bao gồm phí ship):</td>
                                        <td style="color: #000;">${price.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Phí vận chuyển:</td>
                                        <td style="color: #000;">${shipPrice.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Mã giảm giá:</td>
                                        <td style="color: #000;">${voucher.toLocaleString()}₫</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555;">Tổng cộng:</td>
                                        <td style="color: #4CAF50; font-weight: bold;">${TotalAmount.toLocaleString()}₫</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin giao hàng</h3>
                                <p style="color: #555;">
                                    <strong>Người nhận:</strong> ${order.customerInfor.fullname}<br>
                                    <strong>Địa chỉ:</strong> ${order.customerInfor.address}, ${order.customerInfor.ward}, ${order.customerInfor.district}, ${order.customerInfor.city}<br>
                                    <strong>Số điện thoại:</strong> ${order.customerInfor.phone}
                                </p>
                            </div>

                            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Chi tiết sản phẩm</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead>
                                        <tr style="background-color: #f0f0f0;">
                                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Hình ảnh</th>
                                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Tên sản phẩm</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Kích thước</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Màu sắc</th>
                                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Số lượng</th>
                                            <th style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${order.items
                                            .map(
                                                (item) => `
                                                <tr>
                                                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
                                                        <img src="${item?.gallery?.avatar}" alt="${item.name}" style="max-width: 50px; border-radius: 5px;">
                                                    </td>
                                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item?.attribute?.color || "N/A"}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item?.attribute?.size || "N/A"}</td>
                                                    <td style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                                                    <td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toLocaleString()}₫</td>
                                                </tr>
                                            `
                                            )
                                            .join("")}
                                    </tbody>
                                </table>
                            </div>

                            <p style="text-align: center; font-size: 14px; color: #888;">Cảm ơn bạn đã tin tưởng và lựa chọn Fendi Shop! Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:</p>
                            <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                        </div>
                    `;

    await sendEmail(userEmail, subject, message);
};




const failedEmail = async (userEmail, orderNumber) => {
    const order = await orderModel.findOne({ orderNumber });
    if (!order) {
        return; // Nếu không tìm thấy đơn hàng, không làm gì thêm
    }

    const subject = "Thanh toán thất bại";

    const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #FF0000; margin: 0;">FENDI SHOP</h1>
                <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
            </div>
            <h2 style="text-align: center; color: #FF0000;">❌ Thanh toán thất bại ❌</h2>
            <p style="color: #555;">Xin chào <strong>${order?.customerInfor?.fullname || "Khách hàng"}</strong>,</p>
            <p style="color: #555;">Đơn hàng <strong>${orderNumber}</strong> của bạn chưa được thanh toán thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
            <p style="color: #555;">Lưu ý: Nếu bạn không thực hiện thanh toán trong vòng 3 ngày kể từ ngày đặt hàng, đơn hàng của bạn sẽ bị huỷ.</p>

            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin đơn hàng</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f0f0f0;">
                        <td style="color: #555; padding: 10px;">Mã đơn hàng:</td>
                        <td style="color: #000; padding: 10px;"><strong>${orderNumber}</strong></td>
                    </tr>
                    <tr>
                        <td style="color: #555; padding: 10px;">Ngày đặt hàng:</td>
                        <td style="color: #000; padding: 10px;">${new Date(order.createdAt).toLocaleString()}</td>
                    </tr>
                </table>
            </div>

            <p style="text-align: center; font-size: 14px; color: #888;">Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi:</p>
            <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>

            <div style="margin-top: 20px; text-align: center;">
                <p style="color: #555;">Cảm ơn bạn đã tin tưởng mua sắm tại Fendi Shop. Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
                <p style="color: #555;">Chúc bạn một ngày tuyệt vời!</p>
            </div>
        </div>
    `;

    await sendEmail(userEmail, subject, message);
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
            console.error("Order not found for orderNumber:", orderNumber);
            return res.status(404).json({ message: 'Order not found' });
        }
        // Lấy email từ UserModel dựa trên userId của đơn hàng
        const user = await UserModel.findById(order.userId);
        const userEmail = user?.email || ""; // Email của người dùng
        console.log(userEmail)
        if (vnp_Params['vnp_ResponseCode'] === '00') {

            await orderModel.findOneAndUpdate({ orderNumber }, { status: "pending",paymentStatus: "Đã thanh toán" })
             // Gửi email xác nhận thanh toán thành công
             if(userEmail){
                await successEmail(userEmail, orderNumber);  // Gọi hàm gửi email thành công
             }
            return res.redirect('http://localhost:5173/thanks');
        } else {
            await orderModel.findOneAndUpdate({ orderNumber }, { status: "unpaid",paymentStatus: "Chưa thanh toán" })
            if(userEmail){
                // Gửi email thông báo thanh toán thất bại
                await failedEmail(userEmail, orderNumber);  // Gọi hàm gửi email thất bại
             }
            return res.redirect('http://localhost:5173/canpay');
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