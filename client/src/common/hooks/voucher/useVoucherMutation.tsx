import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { IVoucher } from '../../interfaces/voucher';
import { createVoucher, updateVoucher, deleteVoucher } from '../../../services/voucher';

const useVoucherMutation = () => {
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
                        message.success("Cập nhật voucher thành công");
                        return response;
                    } catch (error) {
                        message.error("Cập nhật voucher thất bại");
                        throw error;
                    }
                case "delete":
                    try {
                        await deleteVoucher(options.voucher._id!);
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
