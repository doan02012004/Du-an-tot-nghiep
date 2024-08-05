import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../../services/products'


const useProductQuery = () => {
    const query = useQuery({
        queryKey: ['PRODUCT'],
        queryFn: async () => {
            try {
                const data = await getProducts()
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    return query
}

export default useProductQuery