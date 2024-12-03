// hooks/category/useCategoryMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { ICategoryBlog } from '../../interfaces/categoryBlog';
import { createCategory, deleteCategory, updateCategory } from '../../../services/categoryBlogService';

const useCategoryBlogMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['CATEGORY'],
        mutationFn: async (options: { action: string; categoryData: ICategoryBlog; categoryId?: string }) => {
            switch (options.action) {
                case 'add':
                    try {
                        const data = await createCategory(options.categoryData);
                        message.success('Danh mục đã được tạo thành công');
                        return data;
                    } catch (error) {
                        message.error('Tạo danh mục thất bại');
                    }
                    break;
                case 'update':
                    try {
                        if (!options.categoryId) throw new Error('ID danh mục không tồn tại');
                        const data = await updateCategory(options.categoryId, options.categoryData);
                        message.success('Danh mục đã được cập nhật');
                        return data;
                    } catch (error) {
                        message.error('Cập nhật danh mục thất bại');
                    }
                    break;
                case 'delete':
                    try {
                        if (!options.categoryId) throw new Error('ID danh mục không tồn tại');
                        const data = await deleteCategory(options.categoryId);
                        message.success('Danh mục đã được xoá');
                        return data;
                    } catch (error) {
                        message.error('Xoá danh mục thất bại');
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
        },
    });

    return mutation;
};

export default useCategoryBlogMutation;