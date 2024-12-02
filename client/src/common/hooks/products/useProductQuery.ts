import { useQuery } from '@tanstack/react-query'
import { getProductBySlug, getProducts, getProductSimilar } from '../../../services/products'

type DataFilter = {
    page:number|string|null,
    limit:number|null,
    categorySlug:string|null,
    sizes:string|null,
    colors:string|null,
    min_price:number|null,
    max_price:number|null,
    sell_order:string|null,
    search:string|null,
    active?:boolean
}
const useProductQuery = (option:{slug?:string,dataFilter?:DataFilter, similar?:{categoryId:string|number,productId:string|number}}) => {

    const query = useQuery({
        queryKey: ['PRODUCT',option],
        queryFn: async () => {
            try {
                   if(option.similar){
                    const data = await getProductSimilar(option.similar)
                    return data;
                   }else{
                    const data = option?.slug? await getProductBySlug(option?.slug): await getProducts(option?.dataFilter);
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