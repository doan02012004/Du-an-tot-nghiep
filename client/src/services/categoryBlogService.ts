// services/categoryBlog.ts
import instance from "../common/config/axios";
import { ICategoryBlog } from "../common/interfaces/categoryBlog";

// Tạo mới danh mục
export const createCategory = async (categoryData: ICategoryBlog) => {
    const response = await instance.post('/categoriesBlog', categoryData);
    return response.data;
};

// Lấy danh sách danh mục
export const fetchCategories = async () => {
    const response = await instance.get('/categoriesBlog');
    return response.data;
};

// Lấy danh mục theo ID
export const fetchCategoryById = async (categoryId: string) => {
    const response = await instance.get(`/categoriesBlog/${categoryId}`);
    return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (categoryId: string, categoryData: ICategoryBlog) => {
    const response = await instance.put(`/categoriesBlog/${categoryId}`, categoryData);
    return response.data;
};

// Xóa danh mục
export const deleteCategory = async (categoryId: string) => {
    const response = await instance.delete(`/categoriesBlog/${categoryId}`);
    return response.data;
};
