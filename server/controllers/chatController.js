import ChatModel from "../models/chatModel.js";
import MessageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";






// Gửi tin nhắn
export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message, chatId } = req.body;

        // Kiểm tra người gửi và người nhận có tồn tại
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);

        if (!chatId) {
            const newChat = {
                members: [senderId, receiverId]
            }
            const roomChat = await ChatModel.create(newChat).populate('members');
            const massage = new MessageModel({
                sender: senderId,
                receiver: receiverId,
                message,
                chatId: roomChat._id
            })
            await massage.save()
            return res.status(200).json({ roomChat, massage });
        } else {
            const massage = new MessageModel({
                sender: senderId,
                receiver: receiverId,
                message,
                chatId
            })
            await massage.save()
            return res.status(200).json({ massage });
        }
    } catch (error) {
        res.status(500).json({ message: 'lỗi không gửi được tin nhắn', error });
    }
};

// get chat admin
export const getChatAdmin = async (req, res) => {
    try {
        const admin = await UserModel.findById( req.params.userId ); // Giả sử chỉ có một admin  
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy người quản trị' });
        }
        if(admin.role !== 'admin') {
            return res.status(404).json({ message: 'Không phải người quản trị' });
        }
        const chat = await ChatModel.find({ members: {$in: [admin._id]}}).populate('members');
        res.status(200).json({ chat });
    }   
    catch (error) {
        res.status(500).json({ message: 'lỗi get chat admin', error });
    }
}



// Lấy tất cả tin nhắn giữa admin và user của phần chat user
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await MessageModel.find({ chatId }).populate('sender receiver'); 
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'lỗi get Message', error });
    }
};


//lấy 1 đoạn tin nhắn của 1 user nào đó với admin
export const getFindChat = async (req, res) => {
    try {
        const { senderId, reciverId } = req.params;
        const messages = await ChatModel.find({ members: { $all: [senderId, reciverId ] } }).populate('members');
        res.status(200).json({ messages });
    }
    catch (error) {
        res.status(500).json({ message: 'lỗi get Message', error });
    }
}
