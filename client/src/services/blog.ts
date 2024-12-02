// services/blog.ts
import instance from "../common/config/axios";
import { IBlog, IBlogUpdate } from "../common/interfaces/blog";

// Tạo mới bài viết
export const createBlog = async (blogData: IBlog) => {
    const response = await instance.post('/blogs', blogData);
    return response.data;
};

// Lấy danh sách bài viết
export const fetchBlogs = async () => {
    const response = await instance.get('/blogs');
    return response.data;
};

// Lấy chi tiết bài viết theo ID
export const fetchBlogById = async (blogId: string) => {
    const response = await instance.get(`/blogs/${blogId}`);
    return response.data;
};

// Cập nhật bài viết
export const updateBlog = async (blogId:string,blogData: IBlogUpdate) => {
    const response = await instance.put(`/blogs/${blogId}`, blogData);
    return response.data;
};

// Xóa bài viết
export const deleteBlog = async (blogId: string) => {
    const response = await instance.delete(`/blogs/${blogId}`);
    return response.data;
};
