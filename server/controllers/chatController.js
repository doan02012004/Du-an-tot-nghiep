import ChatModel from "../models/chatModel.js";
import MessageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";

export const createChat = async (req, res) => {
    try {
        const { senderId } = req.body;
        const admin = await UserModel.findOne({
            role:'admin'
        })
        const roomChat = await ChatModel.create({
            members: [senderId, admin._id]
        })
        const chat = await ChatModel.findById(roomChat._id).populate('members');
        return res.status(201).json(chat)
    }
    catch (error) {
        res.status(500).json({ message: 'lỗi get chat admin', error });
    }
}
// Gửi tin nhắn
export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message, chatId,productId,attributeId,images,type } = req.body;
        if(receiverId){
            const massage = new MessageModel({
                sender: senderId,
                receiver: receiverId,
                message,
                chatId,
                productId:productId??null,
                attributeId:attributeId??null,
                images:images??[] ,
                type
            })
            await massage.save()
            return res.status(200).json(massage)
        }else{
            const admin = await UserModel.findOne({
                role:'admin'
            })
            const massage = new MessageModel({
                sender: senderId,
                receiver: admin._id,
                message,
                chatId,
                productId:productId??null,
                attributeId:attributeId??null,
                images:images??[],
                type
            })
            await massage.save()
            return res.status(200).json(massage);
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// get chat admin
export const getChatAdmin = async (req, res) => {
    try {
        const admin = await UserModel.findById(req.params.userId); // Giả sử chỉ có một admin  
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy người quản trị' });
        }
        if (admin.role !== 'admin') {
            return res.status(404).json({ message: 'Không phải người quản trị' });
        }
        const chat = await ChatModel.find({ members: { $in: [admin._id] } }).sort({createdAt:-1}).populate('members');
       return res.status(200).json(chat);
    }
    catch (error) {
        res.status(500).json({ message: 'lỗi get chat admin', error });
    }
}


// Lấy tất cả tin nhắn
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await MessageModel.find({ chatId }).populate('sender receiver productId');
       return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: 'lỗi get Message', error });
    }
};


// Lấy tất cả tin nhắn giữa admin và user của phần chat user
export const getLastMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await MessageModel.findOne({ chatId }).sort({createdAt: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'lỗi get Message', error });
    }
};


//lấy 1 đoạn tin nhắn của 1 user nào đó với admin
export const getFindChatUser = async (req, res) => {
    try {
        const admin = await UserModel.findOne({role:'admin'})
        const { senderId } = req.params;
        const chat = await ChatModel.findOne({ members: { $all: [senderId, admin._id] } }).populate('members');
        return res.status(200).json(chat);
    }
    catch (error) {
       return res.status(500).json({ message: 'lỗi get Message', error });
    }
}
