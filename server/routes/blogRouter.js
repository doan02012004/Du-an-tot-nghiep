// routes/blogRoutes.js
import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";

const router = Router();

// Route cho bài viết
router.post("/", createBlog);  // Tạo bài viết mới
router.get("/", getAllBlogs);   // Lấy danh sách bài viết
router.get("/:blogId", getBlogById);  // Lấy bài viết theo ID
router.put("/:blogId", updateBlog);  // Cập nhật bài viết
router.delete("/:blogId", deleteBlog);  // Xóa bài viết

export default router;
