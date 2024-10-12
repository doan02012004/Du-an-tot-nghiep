import { useQuery } from '@tanstack/react-query'
import { getAllAddressByUserId } from '../../../services/address'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'


const useAddressQuery = () => {
    const {currentUser} = useContext(AppContext)
    const query = useQuery({
        queryKey:['ADDRESSES',currentUser?._id],
        queryFn: async ()=>{
            try {
                const data = await getAllAddressByUserId(currentUser._id)
                return data
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!currentUser?._id
    })
  return query
}

export default useAddressQuery