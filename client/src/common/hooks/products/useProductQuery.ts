import { useQuery } from '@tanstack/react-query'
import { getAllProductBySlug, getProductBySlug, getProducts } from '../../../services/products'


const useProductQuery = (slug ?: string | number, dataFilter ?: any, categorySlug ?:string|any) => {

    const query = useQuery({
        queryKey: ['PRODUCT', slug, dataFilter,categorySlug],
        queryFn: async () => {
            try {

                if (slug) {
                    const data = await getProductBySlug(slug);
                    return data;
                }
                if (categorySlug) {
                    const data = await getAllProductBySlug(categorySlug);
                    return data;
                }
                if (!slug && !categorySlug){
                    const data = await getProducts(dataFilter);
                    return data;
                }
            } catch (error) {
                return error
            }
        },
    })
    return query
}

export default useProductQuery