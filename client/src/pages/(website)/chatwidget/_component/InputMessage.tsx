/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import useChatMutation from '../../../../common/hooks/chats/useChatMutation';
import { useContext } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import { Ichat } from '../../../../common/interfaces/chat';

type Props = {
    chatId: string
}
const InputMessage = ({chatId}:Props) => {
    const { register, handleSubmit, reset } = useForm();
    const chatMutation = useChatMutation()
    const { adminId, currentUser } = useContext(AppContext)


    const onSendMessage: any = (message:{message:string}) => {
        const newMessage: Ichat = {
            chatId: chatId,
            senderId: currentUser?._id,
            receiverId: adminId,
            message: message.message
        }
        chatMutation.mutate({ action: 'send', data: newMessage })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSendMessage)} className="flex gap-2 items-center p-3 border-t border-gray-300">
            <input
                {...register('message', { required: true })}
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button
                className="bg-blue text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                type="submit"
            >
                Gửi
            </button>
        </form>
    )
}

export default InputMessage