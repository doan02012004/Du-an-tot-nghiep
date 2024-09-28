import { useQuery } from "@tanstack/react-query";
import { findChatUser } from "../../../services/chat";

const useChatQuery = (option: { senderId?: string,reciverId?:string }) => {
    const query = useQuery({
        queryKey: ['CHAT',option.senderId],
        queryFn: async () => {
            try {
                const res = await findChatUser(option);
                return res
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!option.senderId
    })
    return query
}

export default useChatQuery