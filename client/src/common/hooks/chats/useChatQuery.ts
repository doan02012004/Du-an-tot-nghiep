import { useQuery } from "@tanstack/react-query";
import { findChatAdmin, findChatUser } from "../../../services/chat";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

const useChatQuery = (option: { senderId?: string,reciverId?:string,isAdmin?:boolean }) => {
    const {adminId} = useContext(AppContext)
    const query = useQuery({
        queryKey: ['CHAT',option.senderId],
        queryFn: async () => {
            try {
                const res = option.isAdmin == true? await findChatAdmin(adminId) : await findChatUser(option);
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