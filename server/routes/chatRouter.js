import { Router } from "express";
import { createChat, getChatAdmin, getFindChatUser, getLastMessage, getMessages, sendMessage } from "../controllers/chatController.js";
const router = Router();


router.post('/send', sendMessage);
router.post('/create', createChat);
router.get('/chatadmin/:userId', getChatAdmin);

router.get('/messages/:chatId', getMessages);
router.get('/lastmessage/:chatId', getLastMessage);
router.get('/chatuser/:senderId/:reciverId', getFindChatUser);




export default router;
