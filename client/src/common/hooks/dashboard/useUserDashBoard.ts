import { useQuery } from '@tanstack/react-query'
import { getTopUserCity, getTopUserCount, getUserNewCount } from '../../../services/dashboard'

const useUserDashBoard = (option:{startDate?:string|null,endDate?:string|null,type:"count"|"top"|"city"}) => {
     
    const query = useQuery({
        queryKey:['USERDASHBOARD',option],
        queryFn: async() =>{
            try {
                const res = option.type =='count'? await getUserNewCount(option) : (option.type =='top' ? await getTopUserCount(option): await getTopUserCity(option))
                return res
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useUserDashBoard