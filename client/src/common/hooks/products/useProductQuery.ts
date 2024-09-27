import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts } from '../../../services/products'


const useProductQuery = (id ?: string | number, dataFilter ?: any) => {

    const query = useQuery({
        queryKey: ['PRODUCT', id, dataFilter],
        queryFn: async () => {
            try {

                if (id) {
                    const data = await getProductById(id);
                    return data;
                }
                if (!id){
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