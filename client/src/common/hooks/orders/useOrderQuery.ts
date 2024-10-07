import { useQuery } from '@tanstack/react-query';
import { fetchOrderById,fetchOrdersByUserId , fetchOrders } from '../../../services/order';
import { Iuser } from '../../interfaces/auth';

export const useOrderQuery = (orderId?: string, userId?:string) => {
    return useQuery({
        queryKey: ['ORDERS', orderId, userId],
        queryFn: async () => {
            if (orderId) {
                return await fetchOrderById(orderId);
            }else if (userId) {
                return await fetchOrdersByUserId(userId);
            } else {
                return await fetchOrders();
            }
        },
        onError: (error) => {
            console.error('Error fetching order data:', error);
        },
    });
};
