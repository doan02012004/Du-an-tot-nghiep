import { useQuery } from "@tanstack/react-query";
import { findChatAdmin, findChatUser } from "../../../services/chat";


const useChatQuery = (option: { senderId?: string,reciverId?:string,isAdmin?:boolean }) => {
    const query = useQuery({
        queryKey: ['CHAT',option.senderId],
        queryFn: async () => {
            try {
                const res = option.isAdmin == true? await findChatAdmin() : await findChatUser(option);
                return res
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!option.senderId || !!option.isAdmin
    })
    return query
}

export default useChatQuery