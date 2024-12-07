import express from 'express';
import { 
    createVoucher, 
    getAllVouchers, 
    updateVoucher, 
    getVoucherById,  // Thêm hàm getVoucherById
    deleteVoucher,     // Thêm hàm deleteVoucher
    getVoucherByCode,
} from '../controllers/voucherController.js';

const router = express.Router();

// Route tạo voucher
router.post('/', createVoucher);

// Route hiển thị tất cả voucher
router.get('/', getAllVouchers);

// Route hiển thị voucher theo ID
router.get('/id/:voucherId', getVoucherById);  // Thêm route lấy voucher theo ID

router.get('/code/:voucherCode', getVoucherByCode);

// Route cập nhật voucher
router.put('/:voucherId', updateVoucher);

// Route xóa voucher
router.delete('/:voucherId', deleteVoucher);  // Thêm route xóa voucher theo ID


// hàm get với url là http://localhost:5000/api/voucher/code/hjfhjdfhjd

export default router;
