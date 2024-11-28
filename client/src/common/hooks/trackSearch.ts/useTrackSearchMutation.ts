import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { trackSearch } from '../../../services/trackSearch';
import { ITrackSearch } from '../../interfaces/search';

const useTrackSearchMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['TRACKSEARCH'],
        mutationFn: async (options: { action: string, keyword: string, userId: string }) => {
            switch (options.action) {
                case "add":
                    try {
                        const response = await trackSearch({ keyword: options.keyword, userId: options.userId });
                        return response;
                    } catch (error) {
                        message.error("Thêm lịch sử thất bại");
                        throw error;
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['TRACKSEARCH'] });
        }
    });
    return mutation;
};

export default useTrackSearchMutation;
