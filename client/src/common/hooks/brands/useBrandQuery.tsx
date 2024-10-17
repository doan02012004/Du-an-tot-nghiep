import { useQuery } from '@tanstack/react-query'
import { getAll, getBrandById } from '../../../services/brands'



const useBrandQuery = (id ?: string) => {
    const query = useQuery({
        queryKey:['BRANDS', id],
        queryFn:async()=>{
            try {
                const data = id ? await getBrandById(id) : await getAll();
                return data;
              } catch (error) { 
                console.log(error);
                throw error; // Đảm bảo lỗi được truyền ra để xử lý trong giao diện
              }
        }
    })
  return query
}

export default useBrandQuery