import { useQuery } from '@tanstack/react-query';
import { fetchOrderById, fetchOrders, fetchOrdersByUserId } from '../../../services/order';

export const useOrderQuery = (options:{orderId?: string, userId?:string, isAdmin?:boolean}) => {
    return useQuery({
        queryKey: ['ORDERS', options],
        queryFn: async () => {
            if (options?.orderId) {
                return await fetchOrderById(options.orderId);
            }
             if (options?.userId) {
                return await fetchOrdersByUserId(options?.userId);
            }
            if (options?.isAdmin) {
                return await fetchOrders();
            }
        },
        enabled:!!options?.orderId||!!options?.userId||!!options?.isAdmin
    });
};