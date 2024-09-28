import { useQuery } from "@tanstack/react-query"
import { getMessage } from "../../../services/chat"

const useMessageQuery = (chatId?: string) => {
    const query = useQuery({
        queryKey: ['MESSAGE', chatId],
        queryFn: async () => {
            try {
                const res = await getMessage(chatId)
                return res
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!chatId
    })
    return query
}

export default useMessageQuery