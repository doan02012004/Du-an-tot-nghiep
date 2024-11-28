import { useQuery } from "@tanstack/react-query"
import { getSearchPopularProduct} from "../../../services/search"
const useSearchQuery = () => {
    const query = useQuery({
        queryKey:['KEYWORD'],
        queryFn: async() =>{
            try {
                const data = await getSearchPopularProduct()
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}
export default useSearchQuery