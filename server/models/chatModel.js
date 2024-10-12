import mongoose from 'mongoose';

const chatModel = new mongoose.Schema({
    members: [
        { type:mongoose.Schema.Types.ObjectId, ref: 'users'}
     ]
}, { timestamps: true });

const ChatModel = mongoose.model('chats', chatModel);
export default ChatModel;
