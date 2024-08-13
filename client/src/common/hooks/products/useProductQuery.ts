import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts } from '../../../services/products'


const useProductQuery = (id?:string|number , dataFilter ?: any) => {

    console.log('Filter Data:', dataFilter);

    const query = useQuery({
        queryKey: ['PRODUCT',id, dataFilter],
        queryFn: async () => {
            try {
                const data = id ? await getProductById(id) : await getProducts()
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        },
    })
    return query
}

export default useProductQuery