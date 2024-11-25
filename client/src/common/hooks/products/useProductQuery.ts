import { useQuery } from '@tanstack/react-query'
import { getProductBySlug, getProducts } from '../../../services/products'

type DataFilter = {
    page:number|null,
    limit:number|null,
    categorySlug:string|null,
    sizes:string|null,
    colors:string|null,
    min_price:number|null,
    max_price:number|null,
    sell_order:string|null,
    search:string|null
}
const useProductQuery = (option:{slug?:string,dataFilter?:DataFilter}) => {

    const query = useQuery({
        queryKey: ['PRODUCT',option],
        queryFn: async () => {
            try {
                    const data = option?.slug? await getProductBySlug(option?.slug): await getProducts(option?.dataFilter);
                    return data;
            } catch (error) {
                return error
            }
        },
    })
    return query
}

export default useProductQuery