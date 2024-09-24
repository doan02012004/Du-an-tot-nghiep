import mongoose from 'mongoose';


const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true,
    }
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  
      },
      message: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,  // Trạng thái tin nhắn đã đọc hoặc chưa
      },
    },
  ],
}, { timestamps: true });

const ChatModel = mongoose.model('chats', chatSchema);

export default ChatModel;
