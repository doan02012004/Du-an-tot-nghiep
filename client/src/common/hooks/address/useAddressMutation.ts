import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iaddress } from '../../interfaces/address'
import { createAddress } from '../../../services/address'

const useAddressMutation = () => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['ADDRESSES'],
        mutationFn: async(option:{action:string,newAddress:Iaddress}) =>{
            switch (option.action) {
                case "add":
                    try {
                        const data = await createAddress(option.newAddress)
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            
                default:
                    break;
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["ADDRESSES"]})
        }
    })
  return mutation
}

export default useAddressMutation