import { StatusCodes } from "http-status-codes";
import BlogModel from "../models/blogModel.js";
import slugify from "slugify";

// Tạo bài viết mới
export const createBlog = async (req, res) => {
    const { title, description, content, thumbnail, categories, tags, featured } = req.body;

    console.log(req.body);  // In ra toàn bộ request body

    if (!title || typeof title !== "string") {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tiêu đề không hợp lệ!" });
    }

    let slug = slugify(title, { lower: true, strict: true });

    try {
        const existingSlug = await BlogModel.findOne({ slug });
        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        const newBlog = await BlogModel.create({
            title,
            description,
            content,
            thumbnail,
            categories,
            tags,
            featured,
            slug,
        });

        return res.status(StatusCodes.CREATED).json(newBlog);
    } catch (error) {
        console.error(error); // Log lỗi để debug
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};



// Lấy danh sách tất cả bài viết (Có phân trang)
export const getAllBlogs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const blogs = await BlogModel.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate("categories");  // Populate lấy thông tin danh mục từ bảng categoryBlog

        const totalBlogs = await BlogModel.countDocuments();
        return res.status(StatusCodes.OK).json({ blogs, totalBlogs });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Lấy bài viết theo ID
export const getBlogById = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await BlogModel.findById(blogId).populate("categories");  // Populate categories

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy bài viết" });
        }

        return res.status(StatusCodes.OK).json(blog);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Cập nhật bài viết
export const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { title, description, content, thumbnail, categories, tags, featured } = req.body;

    // Tạo slug từ title nếu title được cập nhật
    let slug = slugify(title, { lower: true, strict: true });

    try {
        // Kiểm tra slug có trùng lặp không
        const existingSlug = await BlogModel.findOne({ slug });
        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;  // Thêm timestamp vào slug nếu trùng lặp
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            {
                title,
                description,
                content,
                thumbnail,
                categories,
                tags,
                featured,
                slug,
            },
            { new: true } // Trả về bản ghi sau khi cập nhật
        );

        if (!updatedBlog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy bài viết" });
        }

        return res.status(StatusCodes.OK).json(updatedBlog);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Xóa bài viết
export const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await BlogModel.findByIdAndDelete(blogId);

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy bài viết" });
        }

        return res.status(StatusCodes.OK).json({ message: "Bài viết đã được xóa thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};