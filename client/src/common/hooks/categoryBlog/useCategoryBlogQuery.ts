// hooks/category/useCategoryQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryById } from '../../../services/categoryBlogService';

const useCategoryBlogQuery = (categoryId?: string) => {
    const query = useQuery({
        queryKey: ['CATEGORY', categoryId],
        queryFn: async () => {
            try {
                const data = categoryId ? await fetchCategoryById(categoryId) : await fetchCategories();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    });
    return query?.data;
};

export default useCategoryBlogQuery;
