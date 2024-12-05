import { Router } from "express";
import { getUserFavorites, toggleFavoriteProduct } from "../controllers/favoriteController.js";

const router = Router();
router.get("/:userId", getUserFavorites); // Lấy yêu thích theo userId
router.post("/", toggleFavoriteProduct);  // Thêm hoặc cập nhật yêu thích

export default router;
