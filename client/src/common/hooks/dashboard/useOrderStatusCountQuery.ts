import { useQuery } from '@tanstack/react-query'
import {  getStatusOrderCount } from '../../../services/dashboard'

const useOrderStatusCountQuery = (option:{startDate?:string|null,endDate?:string|null,status:string}) => {
    
    const query = useQuery({
        queryKey:['ORDERSTATUSCOUNT',option],
        queryFn: async() =>{
            try {
                const res = await getStatusOrderCount(option)
                return res
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useOrderStatusCountQuery

