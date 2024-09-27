import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,ref:'chats',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const MessageModel = mongoose.model('messeage', messageSchema);
export default MessageModel;
