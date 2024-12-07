/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../../common/contexts/AppContextProvider";
import useChatMutation from "../../../../common/hooks/chats/useChatMutation";
import { Ichat } from "../../../../common/interfaces/chat";
import { Iuser } from "../../../../common/interfaces/auth";
import { message } from "antd";
import { SendOutlined } from "@ant-design/icons";
type Props = {
    chatId: string|null,
    userMessage:Iuser|null
}
const InputSendMessgae = ({chatId,userMessage}:Props) => {
    const { register, handleSubmit, reset } = useForm();
    const chatMutation = useChatMutation()
    const { currentUser } = useContext(AppContext)


    const onSendMessage: any = (data:{message:string}) => {
       if(!chatId || !userMessage){
        return message.error("Vui lòng thao tác lại")
       }else{
        const newMessage: Ichat = {
            chatId: chatId,
            senderId: currentUser?._id,
            receiverId: userMessage?._id,
            message: data.message,
            images: [],
            type:'message'
        }
        chatMutation.mutate({ action: 'send', data: newMessage })
        reset()
       }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSendMessage)} className="mt-4 flex gap-x-3">
            <textarea
                    {...register('message', { required: true })}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 resize-none text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <button
                    disabled={!chatId && true }
                    type="submit"
                    className='hover:text-blue'
                >
                    <SendOutlined />
                </button>
                {/* <input
                  {...register('message', { required: true })}
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    placeholder="Nhập tin nhắn..."
                />
                <button disabled={!chatId && true } className="bg-blue text-white p-2 rounded-r-md hover:bg-blue-600">
                    Gửi
                </button> */}
            </form>

        </>
    )
}

export default InputSendMessgae