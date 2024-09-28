/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../../common/contexts/AppContextProvider";
import useChatMutation from "../../../../common/hooks/chats/useChatMutation";
import { Ichat } from "../../../../common/interfaces/chat";
import { Iuser } from "../../../../common/interfaces/auth";
import { message } from "antd";
type Props = {
    chatId: string|null,
    userMessage:Iuser|null
}
const InputSendMessgae = ({chatId,userMessage}:Props) => {
    const { register, handleSubmit, reset } = useForm();
    const chatMutation = useChatMutation()
    const { adminId } = useContext(AppContext)


    const onSendMessage: any = (data:{message:string}) => {
       if(!chatId || !userMessage){
        return message.error("Vui lòng thao tác lại")
       }else{
        const newMessage: Ichat = {
            chatId: chatId ,
            senderId: adminId,
            receiverId: userMessage?._id,
            message: data.message
        }
        chatMutation.mutate({ action: 'send', data: newMessage })
        reset()
       }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSendMessage)} className="mt-4 flex ">
                <input
                  {...register('message', { required: true })}
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    placeholder="Nhập tin nhắn..."
                />
                <button disabled={!chatId && true } className="bg-blue text-white p-2 rounded-r-md hover:bg-blue-600">
                    Gửi
                </button>
            </form>

        </>
    )
}

export default InputSendMessgae