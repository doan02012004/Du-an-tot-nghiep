import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryBlogController.js";

const router = Router();

// Tạo mới danh mục
router.post("/", createCategory);  // Dùng POST tại / thay vì /create

// Lấy danh sách các danh mục
router.get("/", getCategories);

// Lấy danh mục theo slug
// router.get("/:slug", getCategoryBySlug);
router.get("/:id", getCategoryById);

// Cập nhật danh mục
router.put("/:id", updateCategory);  // Dùng :id thay vì :categoryId để rõ ràng hơn

// Xoá danh mục
router.delete("/:id", deleteCategory);  // Cũng thay :categoryId bằng :id

export default router;
