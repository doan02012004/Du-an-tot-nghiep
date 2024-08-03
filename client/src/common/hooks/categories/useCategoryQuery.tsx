import { useQuery } from '@tanstack/react-query'
import { getAll } from '../../../services/categories'

type Props = {}

const useCategoryQuery = (props: Props) => {
    const query = useQuery({
        queryKey:['CATEGORIES'],
        queryFn:async()=>{
            try {
                const data = await getAll();
                return data;
              } catch (error) {
                console.log(error);
                throw error; // Đảm bảo lỗi được truyền ra để xử lý trong giao diện
              }
        }
    })
  return query
}

export default useCategoryQuery