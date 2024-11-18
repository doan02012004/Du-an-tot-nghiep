import { useQuery } from "@tanstack/react-query"
import { getTopSellingProduct } from "../../../services/dashboard"


const useProductDashboard = (option:{startDate?:string|null,endDate?:string|null}) => {
    const query = useQuery({
        queryKey:['USERDASHBOARD',option],
        queryFn: async() =>{
            try {
                const res =  await getTopSellingProduct(option)
                return res
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useProductDashboard