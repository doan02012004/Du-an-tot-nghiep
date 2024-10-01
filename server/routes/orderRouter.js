import { Router } from "express";
import { createOrder, deleteOrder, getAllOrder, getOrderById, updateOrderStatus } from "../controllers/orderController.js";


const router = Router();
router.get("/", );
router.post("/",createOrder );

// Route để lấy tất cả đơn hàng
router.get('/all', getAllOrder);
// Route để lấy chi tiết một đơn hàng
router.get('/:orderId', getOrderById);
// Route để cập nhật trạng thái đơn hàng
router.put('/update-status', updateOrderStatus);

// Route để xóa đơn hàng
router.delete('/:orderId', deleteOrder);
export default router;