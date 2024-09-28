import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Ichat } from "../../interfaces/chat";
import { sendMessage } from "../../../services/chat";

const useChatMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['CHAT'],
        mutationFn: async (option: { action: string, data: Ichat }) => {
            switch (option.action) {
                case 'send':
                    try {
                        const res = await sendMessage(option.data)
                        return res.data
                    } catch (error) {
                        console.log(error)
                    }
                    break;

                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CHAT'] }),
            queryClient.invalidateQueries({ queryKey: ['MESSAGE'] })
        }
    })
    return mutation
}

export default useChatMutation