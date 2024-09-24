import ChatModel from "../models/chatModel";


// tạo 1 cuộc trò chuyện mới
export const startChat = async (req, res) => {
    const { userId, adminId } = req.body;

    try {
        const existChat = await ChatModel.findOne({ participants: [userId, adminId] });
        if (existChat) {
            return res.status(200).json({ message: 'Cuộc trò chuyện đã tồn tại.' });
        }

        const newChat = new ChatModel({
            participants: [userId, adminId],
            messages: [],
        })

        const savedChat = await newChat.save();
        res.status(201).json({ chat: savedChat });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Lỗi khi tạo cuộc trò chuyện.' });
    }
}


// gửi tin nhắn đi
export const sendMessage = async (req, res) => {
    const { sendId, chatId, message } = req.body;
    try {
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" })
        }
        // gửi tin nhắn  vào cuộc trò chuyện
        chat.messages.push({ sender: sendId, message: message, isRead: false })
        const updatedChat = await chat.save();
        return res.status(200).json({ chat: updatedChat })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "lỗi không thể gửi tin nhắn" })
    }
}


//lấy hết tin nhắn trong cuộc trò chuyện
export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const chat = await ChatModel.findById(chatId).populate('messages.sender', 'firstname lastname email') // chỗ này hơi cấn nha
        if (!chat) {
            return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" })
        }
        res.status(200).json({ messages: chat.messages })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "lỗi không thể lấy tin nhắn" })
    }
}

// lấy danh sách cuộ trò chuyện của 1 người dùng
export const getChatByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await ChatModel.find({ participants: userId }).populate('participants', 'firstname lastname email')
        res.status(200).json({ chats })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "lỗi không thể lấy cuộc trò chuyện" })
    }
}

//trạng thái tin nhắn 
export const statusMessage = async (req, res) => {
    try {
        const {chatId, messageId} = req.body;
        const chat = await ChatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" })
        }
        //tìm và đánh dấu tin nhắn đã đọc
        const message = chat.messages.id(messageId);
        if(!message){
            return res.status(404).json({ message: "Không tìm thấy tin nhắn" })
        }

        message.isRead = true;  
        const updatedChat = await chat.save();
        return res.status(200).json({ chat: updatedChat })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "lỗi không thể cập nhật trạng thái tin nhắn" })
    }
}