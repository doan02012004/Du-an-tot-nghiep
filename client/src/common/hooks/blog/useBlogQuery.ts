import { useQuery } from '@tanstack/react-query';
import { fetchBlogById, fetchBlogs } from '../../../services/blog';

const useBlogQuery = (blogId?: string) => {
    const query = useQuery({
        queryKey: ["BLOG", blogId],
        queryFn: async () => {
            try {
                const data = blogId ? await fetchBlogById(blogId) : await fetchBlogs();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    });
    return query.data;
};

export default useBlogQuery;