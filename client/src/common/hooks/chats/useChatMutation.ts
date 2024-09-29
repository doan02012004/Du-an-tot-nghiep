import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Ichat } from "../../interfaces/chat";
import { sendMessage } from "../../../services/chat";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

const useChatMutation = () => {
    const queryClient = useQueryClient()
    const {socket} = useContext(AppContext)
    const mutation = useMutation({
        mutationKey: ['CHAT'],
        mutationFn: async (option: { action: string, data: Ichat }) => {
            switch (option.action) {
                case 'send':
                    try {
                        const res = await sendMessage(option.data)
                        if(res && res?._id){
                            socket?.current.emit("sendMessage",res)
                        }
                        return res
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
            queryClient.invalidateQueries({ queryKey: ['MESSAGE'] }),
            queryClient.invalidateQueries({ queryKey: ['LASTMESSAGE'] })
        }
    })
    return mutation
}

export default useChatMutation