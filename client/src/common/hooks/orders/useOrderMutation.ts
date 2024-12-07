/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder, deleteOrder, updateOrderStatus } from '../../../services/order'
import { message } from 'antd'

const useOrderMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['ORDERS'],
        mutationFn: async (option: { action: string, newOrder?: any, orderData?: any; orderId?: string; status?: string; cancelReason?: string }) => {
            // console.log(option)
            switch (option.action) {
                case "create":
                    try {
                        const data = await createOrder(option.newOrder)
                        return data
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'updateStatus':
                    try {
                        const { orderId, status, cancelReason } = option;
                        // Nếu trạng thái là 'cancelled', truyền thêm lý do huỷ
                        const response = await updateOrderStatus(orderId, status, cancelReason);
                        message.success('Cập nhật trạng thái thành công');
                        return response;
                    } catch (error) {
                        message.error('Cập nhật trạng thái thất bại');
                    }
                    break;
                case 'deleteOrder':
                    try {
                        const response = await deleteOrder(option.orderId);
                        message.success('Xoá thành công');
                        return response.data;
                    } catch (error) {
                        message.error('Xoá thất bại');
                    }
                    break;

                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ORDERS'] })
            queryClient.invalidateQueries({ queryKey: ['CARTS'] })
        }
    })
    return mutation
}

export default useOrderMutation
