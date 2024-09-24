import express from "express";
import { getMessages } from "../controllers/chatController";
const router = express.Router()

router.get('/:chatId/messages', getMessages)


export default router;
