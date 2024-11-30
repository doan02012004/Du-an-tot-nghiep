import { useQuery } from '@tanstack/react-query'
// import { getAddressByUserId } from '../../../services/address'
import { getAllAddress } from '../../../services/address'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'

const useAddressQuery = () => {
    const {currentUser} = useContext(AppContext)
    const query = useQuery({
        queryKey:['ADDRESSES',currentUser?._id],
        queryFn: async ()=>{
            try {
                // const data = await getAddressByUserId(currentUser._id)
                const data = await getAllAddress(currentUser._id)
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