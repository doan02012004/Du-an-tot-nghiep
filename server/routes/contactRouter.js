import { Router } from 'express';
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
} from '../controllers/contactController.js';

const router = Router();

// Tạo liên hệ mới
router.post('/', createContact);

// Lấy tất cả liên hệ
router.get('/', getAllContacts);

// Lấy liên hệ theo ID
router.get('/:contactId', getContactById);

// Cập nhật trạng thái và trả lời liên hệ
router.put('/:contactId', updateContactStatus);

// Xóa liên hệ
router.delete('/:contactId', deleteContact);

export default router;
