import { useQuery } from '@tanstack/react-query';
import { fetchOrderById, fetchOrders } from '../../../services/order';

export const useOrderQuery = (orderId?: string) => {
    return useQuery({
        queryKey: ['ORDERS', orderId],
        queryFn: async () => {
            if (orderId) {
                return await fetchOrderById(orderId);
            } else {
                return await fetchOrders();
            }
        },
        onError: (error) => {
            console.error('Error fetching order data:', error);
        },
    });
};
