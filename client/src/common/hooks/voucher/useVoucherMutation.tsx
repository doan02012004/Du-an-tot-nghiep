import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { IVoucher } from '../../interfaces/voucher';
import { createVoucher, updateVoucher, deleteVoucher } from '../../../services/voucher';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContextProvider';

const useVoucherMutation = () => {
    const { socket } = useContext(AppContext)
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['VOUCHERS'],
        mutationFn: async (options: { action: string, voucher: IVoucher }) => {
            switch (options.action) {
                case "add":
                    try {
                        const response = await createVoucher(options.voucher);
                        message.success("Thêm voucher thành công");
                        return response;
                    } catch (error) {
                        message.error("Thêm voucher thất bại");
                        throw error;
                    }
                case "update":
                    try {
                        const response = await updateVoucher(options.voucher);
                        if (response?.success) {
                            if (socket?.current) {
                                socket.current?.emit('adminUpdateVoucher', response.voucher)
                            }
                        }
                        return response;
                    } catch (error) {
                        message.error("Cập nhật voucher thất bại");
                        throw error;
                    }
                case "delete":
                    try {
                        const data = await deleteVoucher(options.voucher._id!);
                        if (data?.success) {
                            message.success("Xóa voucher thành công");
                            if (socket?.current) {
                                socket.current?.emit('adminDeleteVoucher', data.data)
                            }
                        }

                    } catch (error) {
                        message.error("Xóa voucher thất bại");
                        throw error;
                    }
                    break;
                case "checkVoucher":
                    try {
                        // await  checkVoucher(options.voucher._id!);
                        message.success("Xóa voucher thành công");
                    } catch (error) {
                        message.error("Xóa voucher thất bại");
                        throw error;
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['VOUCHERS'] });
        }
    });
    return mutation;
};

export default useVoucherMutation;
