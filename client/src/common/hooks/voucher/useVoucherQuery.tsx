import { useQuery } from '@tanstack/react-query';
import { getAllVouchers, getVoucherByCode, getVoucherById } from '../../../services/voucher';

const useVoucherQuery = (option:{id ?: string,code ?:string}) => {
    const query = useQuery({
        queryKey: ['VOUCHERS', option],
        queryFn: async () => {
            try {
                if (option.id) {
                    const data =  await getVoucherById(option.id)
                    return data
                }else if (option.code){
                    const data = await getVoucherByCode(option.code)
                    return data
                }else {
                    const data = await getAllVouchers()
                    return data
                }
                
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
    return query;
};



export default useVoucherQuery;
