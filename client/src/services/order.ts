/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios"

export const createOrder = async(option:any) =>{
    try {
        const res = await instance.post('/orders',option)
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
export const fetchOrdersByUserId = async (userId : string) => {
    const response = await instance.get(`/orders/order-manager/${userId}`);
    return response.data;
};

// Lấy chi tiết đơn hàng
export const fetchOrderById = async (orderId) => {
    const response = await instance.get(`/orders/${orderId}`);
    return response.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, status) => {
    const response = await instance.put('/orders/update-status', { orderId, status });
    return response.data;
};

// Xóa đơn hàng
export const deleteOrder = async (orderId) => {
    const response = await instance.delete(`/orders/${orderId}`);
    return response.data;
};