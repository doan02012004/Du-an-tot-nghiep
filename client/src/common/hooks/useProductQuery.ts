import { useQuery } from '@tanstack/react-query'
import instance from '../config/axios'


const useProductQuery = () => {

    const query = useQuery({
        queryKey:['PRODUCT'],
        queryFn: async()=>{
            try {
             const res = await instance.get('/products')
             return res.data
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useProductQuery