import { Router } from "express";
import { createOrder, deleteOrder, getAllOrder, getOrderById, getOrderByUserId, paymentVNPay, updateOrderStatus, vnpayReturn } from "../controllers/orderController.js";


const router = Router();
router.get("/",);
router.post("/", createOrder);

// Route để lấy tất cả đơn hàng
router.get('/all', getAllOrder);
// Route để lấy chi tiết một đơn hàng
router.get('/:orderId', getOrderById);
// Route để lấy don hang theo id user
router.get('/order-manager/:userId', getOrderByUserId);
// Route để cập nhật trạng thái đơn hàng
router.put('/update-status', updateOrderStatus);

// Route để xóa đơn hàng
router.delete('/:orderId', deleteOrder);

router.post('/payment/vnpay', paymentVNPay);

router.get('/payment/vnpay/return', vnpayReturn);
export default router;