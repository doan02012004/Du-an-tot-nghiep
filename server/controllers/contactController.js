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
        const subject = "Cảm ơn bạn đã liên hệ với chúng tôi!";
        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                    <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                </div>
                <h2 style="text-align: center; color: #FF0000;">📢 Cảm ơn bạn đã liên hệ với chúng tôi 📢</h2>
                <p style="color: #555;">Xin chào <strong>${user.firstname} ${user.lastname}</strong>,</p>
                <p style="color: #555;">Cảm ơn bạn đã gửi liên hệ với tiêu đề: <strong>"${title}"</strong>. Đội ngũ của chúng tôi sẽ phản hồi trong thời gian sớm nhất. Chúng tôi rất trân trọng mối quan tâm của bạn!</p>
                
                <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Thông tin liên hệ</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #f0f0f0;">
                            <td style="color: #555; padding: 10px;">Tiêu đề:</td>
                            <td style="color: #000; padding: 10px;"><strong>${title}</strong></td>
                        </tr>
                        <tr>
                            <td style="color: #555; padding: 10px;">Nội dung:</td>
                            <td style="color: #000; padding: 10px;">${message}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #555;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
                    <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    <p style="color: #555;">Chúng tôi mong sớm được phản hồi và hỗ trợ bạn trong thời gian tới!</p>
                    <p style="color: #555;">Trân trọng, Đội ngũ hỗ trợ của Fendi Shop</p>
                </div>
            </div>
        `;

        // Gửi email xác nhận cho khách hàng
         sendEmail(user.email, subject, emailContent);

        // Trả về thông tin liên hệ đã được tạo
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
            const emailContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #4CAF50; margin: 0;">FENDI SHOP</h1>
                        <p style="margin: 0; font-style: italic; color: #888;">- THỜI TRANG NAM NỮ -</p>
                    </div>
                    <h2 style="text-align: center; color: #FF0000;">📢 Phản hồi từ đội ngũ hỗ trợ 📢</h2>
                    <p style="color: #555;">Xin chào <strong>${user.firstname} ${user.lastname}</strong>,</p>
                    <p style="color: #555;">Liên hệ của bạn với tiêu đề: <strong>"${updatedContact.title}"</strong> đã được cập nhật. Dưới đây là phản hồi của chúng tôi:</p>
                    
                    <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Phản hồi</h3>
                        <p style="color: #000;">${response}</p>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #555;">Nếu bạn có bất kỳ câu hỏi nào thêm, vui lòng liên hệ với chúng tôi qua:</p>
                        <p style="text-align: center; font-weight: bold; color: #333;">💌 Hotline: 0968 949 781 | Email: support@shop.com</p>
                    </div>

                    <div style="margin-top: 30px; text-align: center;">
                        <p style="color: #555;">Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>
                        <p style="color: #555;">Trân trọng, Đội ngũ hỗ trợ của Fendi Shop</p>
                    </div>
                </div>
            `;

            // Gửi email phản hồi cho khách hàng
            sendEmail(user.email, subject, emailContent);
        }

        // Trả về liên hệ đã được cập nhật
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