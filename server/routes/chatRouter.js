import { Router } from "express";
import { getChatAdmin, getMessages, sendMessage } from "../controllers/chatController.js";
const router = Router();


router.post('/send', sendMessage);

router.get('/chatadmin', getChatAdmin);

router.get('/messages/:chatId', getMessages);

router.get('/chatadmin', getChatAdmin);




export default router;
