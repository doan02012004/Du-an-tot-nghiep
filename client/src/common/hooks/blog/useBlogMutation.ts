    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { message } from 'antd';
    import { createBlog, deleteBlog, updateBlog } from '../../../services/blog';
    import { IBlog } from '../../interfaces/blog';
    import { IBlogUpdate } from './../../interfaces/blog';

    const useBlogMutation = () => {
        const queryClient = useQueryClient();
        const mutation = useMutation({
            mutationKey: ['BLOG'],
            mutationFn: async (options: { action: string; blogData: any, blogId: string }) => {
                switch (options.action) {
                    case 'add':
                        try {
                            const data = await createBlog(options.blogData as IBlog);
                            message.success('Bài viết đã được tạo thành công');
                            return data;
                        } catch (error) {
                            return message.error('Tạo bài viết thất bại');
                        }
                    case 'update':
                        try {
                            const data = await updateBlog(options.blogId,options.blogData as IBlogUpdate);
                            message.success('Bài viết đã được cập nhật');
                            return data;
                        } catch (error) {
                            return message.error('Cập nhật bài viết thất bại');
                        }
                    case 'delete': // Thêm trường hợp xoá
                        try {
                            if (!options.blogId) {
                                throw new Error('Không tìm thấy ID bài viết');
                            }
                            const data = await deleteBlog(options.blogId);
                            message.success('Bài viết đã được xoá');
                            return data;
                        } catch (error) {
                            return message.error('Xoá bài viết thất bại');
                        }
                    default:
                        break;
                }
            },
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['BLOG'] });
            },
        });
        return mutation;
    };

    export default useBlogMutation;
