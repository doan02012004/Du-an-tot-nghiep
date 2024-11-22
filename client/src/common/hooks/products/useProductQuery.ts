import { useQuery } from '@tanstack/react-query'
import { getProductBySlug, getProducts } from '../../../services/products'


const useProductQuery = (slug ?: string | number, dataFilter ?: any) => {

    const query = useQuery({
        queryKey: ['PRODUCT', slug, dataFilter],
        queryFn: async () => {
            try {

                if (slug) {
                    const data = await getProductBySlug(slug);
                    return data;
                }
                if (!slug){
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