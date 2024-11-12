import { useQuery } from '@tanstack/react-query'
import { getRevenue } from '../../../services/dashboard'

const useRevenueQuery = (option:{startDate?:string|null,endDate?:string|null}) => {
    
    const query = useQuery({
        queryKey:['REVENUE',option],
        queryFn: async() =>{
            try {
                const res = await getRevenue(option)
                return res
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useRevenueQuery