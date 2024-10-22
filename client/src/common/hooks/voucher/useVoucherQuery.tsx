import { useQuery } from '@tanstack/react-query';
import { getAllVouchers, getVoucherById } from '../../../services/voucher';

const useVoucherQuery = (id ?: string) => {
    const query = useQuery({
        queryKey: ['VOUCHERS', id],
        queryFn: async () => {
            try {
                const data = id ? await getVoucherById(id) : await getAllVouchers();
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
    return query;
};

export default useVoucherQuery;
