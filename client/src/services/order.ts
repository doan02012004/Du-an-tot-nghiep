/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios"

export const createOrder = async (option: any) => {
    try {
        const res = await instance.post('/orders', option)
        return res.data
    } catch (error) {
        return error
    }
}

// Lấy danh sách đơn hàng
export const fetchOrders = async () => {
    const response = await instance.get('/orders/all');
    return response.data;
};

// Lấy don hang theo user id
export const fetchOrdersByUserId = async (userId: string) => {
    const response = await instance.get(`/orders/order-manager/${userId}`);
    return response.data;
};

// Lấy chi tiết đơn hàng
export const fetchOrderById = async (orderId) => {
    const response = await instance.get(`/orders/${orderId}`);
    return response.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, status, cancelReason) => {
    const data: any = { orderId, status };

    // Nếu trạng thái là 'cancelled', thêm lý do huỷ vào dữ liệu gửi đi
    if (status === "cancelled" && cancelReason) {
        data.cancelReason = cancelReason;
    }

    const response = await instance.put('/orders/update-status', data);
    return response.data;
};


// Xóa đơn hàng
export const deleteOrder = async (orderId) => {
    const response = await instance.delete(`/orders/${orderId}`);
    return response.data;
};
// Gọi API thanh toán đơn hàng bằng VNPay
export const paymentVNPay = async (amount, orderId) => {
    try {
        // Gửi request POST đến endpoint VNPay
        const response = await instance.post('/orders/payment/vnpay', { amount, orderId });

        // Trả về dữ liệu nếu thành công
        return response.data;
    } catch (error) {
        // Kiểm tra lỗi từ response nếu có
        console.log(error);
    }
};

export const paymentReturn = async (data) => {
    try {
        const res = await instance.post('/orders/payment/vnpay/return', data)
        return res.data
    } catch (error) {
        return error
    }
}