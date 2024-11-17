import express from "express";
import {
  createComment,
  getCommentsByProductId,
  getCommentsByUserId,
  getCommentById,
  deleteCommentById,
  updateCommentById,
  
} from "../controllers/commentController.js";

const router = express.Router();
router.post("/product", createComment);
router.get("/product/:productId", getCommentsByProductId);
router.get("/user/:userId", getCommentsByUserId);
router.get("/details/:commentId", getCommentById);
router.delete("/:commentId", deleteCommentById);
router.put("/:commentId", updateCommentById);

export default router;   
