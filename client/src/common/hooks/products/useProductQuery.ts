import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts, getProductsByFilter } from '../../../services/products'


const useProductQuery = (id ?: string | number, dataFilter ?: any) => {

    const query = useQuery({
        queryKey: ['PRODUCT', id, dataFilter],
        queryFn: async () => {
            try {
                if (dataFilter && Object.keys(dataFilter).length > 0) {
                    const filteredData = await getProductsByFilter(dataFilter);
                    console.log('Filtered Data:', filteredData);
                    return filteredData;
                }

                if (id) {
                    const data = await getProductById(id);
                    console.log('Product Data:', data);
                    return data;
                }

                if (!id && !dataFilter){
                    const data = await getProducts();
                    console.log('Product all Data:', data)
                    return data;
                }
            } catch (error) {
                console.log(error)
            }
        },
    })
    return query
}

export default useProductQuery