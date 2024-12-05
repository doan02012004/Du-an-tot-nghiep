import { useQuery } from '@tanstack/react-query';
import { getNewComplaintsCount } from '../../../services/dashboard'; // Đảm bảo đường dẫn chính xác

const useNewComplaintsCountQuery = (option: { startDate?: string | null, endDate?: string | null }) => {
    
    const query = useQuery({
        queryKey: ['NEWCOMPLAINTSCOUNT', option],
        queryFn: async () => {
            try {
                const res = await getNewComplaintsCount(option);
                return res;
            } catch (error) {
                console.log(error);
            }
        }
    });

    return query;
};

export default useNewComplaintsCountQuery;
