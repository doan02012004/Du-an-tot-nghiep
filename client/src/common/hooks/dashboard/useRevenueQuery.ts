import { useQuery } from '@tanstack/react-query'
import { getMonthlyRevenue, getRevenue } from '../../../services/dashboard'

const useRevenueQuery = (option:{startDate?:string|null,endDate?:string|null,type:"revenue"|"month"}) => {
    
    const query = useQuery({
        queryKey:['REVENUE',option],
        queryFn: async() =>{
            try {
                const res = option?.type=='revenue'? await getRevenue(option): await getMonthlyRevenue()
                return res
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useRevenueQuery