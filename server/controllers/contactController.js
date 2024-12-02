import { StatusCodes } from 'http-status-codes';
import contactModel from '../models/contactModel.js';
import UserModel from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// Tạo liên hệ mới
export const createContact = async (req, res) => {
    const { userId, title, message } = req.body;

    try {
        // Kiểm tra xem user có tồn tại không
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Người dùng không tồn tại" });
        }

        // Tạo liên hệ mới
        const contact = await contactModel.create({ userId, title, message });

        // Gửi email xác nhận
        const subject = "Cảm ơn bạn đã liên hệ!";
        const responseMessage = `Xin chào ${user.firstname} ${user.lastname},\n\nCảm ơn bạn đã gửi liên hệ với tiêu đề: "${title}". Đội ngũ của chúng tôi sẽ phản hồi trong thời gian sớm nhất.\n\nTrân trọng, Đội ngũ hỗ trợ.`;
        await sendEmail(user.email, subject, responseMessage);

        return res.status(StatusCodes.CREATED).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy tất cả liên hệ
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find()
            .populate('userId', 'fullname email');

        return res.status(StatusCodes.OK).json(contacts);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy liên hệ theo ID
export const getContactById = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await contactModel.findById(contactId)
            .populate('userId', 'fullname email');

        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ" });
        }

        return res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Cập nhật trạng thái và trả lời liên hệ
export const updateContactStatus = async (req, res) => {
    const { contactId, status, response } = req.body;

    try {
        const validStatuses = ['new', 'in_progress', 'resolved'];
        if (!validStatuses.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Trạng thái không hợp lệ' });
        }

        const updatedContact = await contactModel.findByIdAndUpdate(
            contactId,
            { status, response },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy liên hệ' });
        }

        // Lấy thông tin người dùng
        const user = await UserModel.findById(updatedContact.userId);

        // Gửi email phản hồi nếu có cập nhật
        if (response && user) {
            const subject = "Phản hồi từ đội ngũ hỗ trợ";
            const responseMessage = `Xin chào ${user.firstname} ${user.lastname},\n\nLiên hệ của bạn với tiêu đề: "${updatedContact.title}" đã được cập nhật.\n\nPhản hồi của chúng tôi: ${response}\n\nCảm ơn bạn đã liên hệ với chúng tôi!`;
            await sendEmail(user.email, subject, responseMessage);
        }

        return res.status(StatusCodes.OK).json(updatedContact);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Xóa liên hệ
export const deleteContact = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await contactModel.findById(contactId);

        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy liên hệ" });
        }

        await contactModel.findByIdAndDelete(contactId);

        return res.status(StatusCodes.OK).json({ message: "Liên hệ đã được xóa thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
