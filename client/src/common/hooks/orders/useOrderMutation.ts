/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '../../../services/order'


const useOrderMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['ORDERS'],
        mutationFn: async(option:{action:string,newOrder:any}) =>{
            switch (option.action) {
                case "create":
                    try {
                        const data =  await createOrder(option.newOrder) 
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            
                default:
                    break;
            }
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['ORDERS']})
            queryClient.invalidateQueries({queryKey:['CARTS']})
        }
    })
  return mutation
}

export default useOrderMutation