import express from "express";
import {
  createComment,
  getCommentsByProductId,
  getCommentsByUserId,
  getCommentById,
  deleteCommentById,
  updateCommentById,
  createCommentExtra,
  deleteCommentExtraById,
  likeCommentById,
  likeCommentExtraById,
  
} from "../controllers/commentController.js";

const router = express.Router();
router.post("/product", createComment);
router.post("/recomment", createCommentExtra);
router.post("/like/comment", likeCommentById);
router.post("/like/recomment", likeCommentExtraById);
router.get("/product/:productId", getCommentsByProductId);
router.get("/user/:userId", getCommentsByUserId);
router.get("/details/:commentId", getCommentById);
router.delete("/:commentId", deleteCommentById);
router.delete("/recomments/:commentId/:recommentId", deleteCommentExtraById);
router.put("/:commentId", updateCommentById);

export default router;   
