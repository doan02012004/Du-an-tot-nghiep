import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../../services/cart';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContextProvider';

const useCartQuery = () => {
    const { currentUser } = useContext(AppContext)
    const query = useQuery({
        queryKey: ['CARTS', currentUser?._id],
        queryFn: async () => {
            try {
                const data = await getCart(currentUser?._id);
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        enabled: !!currentUser?._id
    })
    return query
}

export default useCartQuery