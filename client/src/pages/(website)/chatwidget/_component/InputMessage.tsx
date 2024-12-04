/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import useChatMutation from '../../../../common/hooks/chats/useChatMutation';
import { useContext } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import { Ichat } from '../../../../common/interfaces/chat';
import { createChat } from '../../../../services/chat';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import MessageTag from './MessageTag';
import { useDispatch, useSelector } from 'react-redux';
import { setMesageTag } from '../../../../common/redux/features/chatSlice';

type Props = {
    chatId: string
}
const InputMessage = ({ chatId }: Props) => {
    const { register, handleSubmit, reset } = useForm();
    const chatMutation = useChatMutation()
    const { adminId, currentUser, socket } = useContext(AppContext)
    const mesageTag = useSelector((state:any) => state.chat.messageTag)
    const dispath = useDispatch()
    const onSendMessage: any = async (message: { message: string }) => {
        if (!chatId) {
            try {
                const chat = await createChat({ senderId: currentUser?._id, receiverId: adminId })
                if (chat) {
                    socket?.current?.emit("createChat", chat)
                    const newMessage: Ichat = {
                        chatId: chat._id,
                        senderId: currentUser?._id,
                        message: message.message,
                        images:mesageTag?.images??null,
                        productId:mesageTag?.product?._id??null,
                        attributeId:mesageTag?.attribute?._id??null
                    }
                    chatMutation.mutate({ action: 'send', data: newMessage })
                    reset()
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const newMessage: Ichat = {
                chatId: chatId,
                senderId: currentUser?._id,
                message: message.message,
                images:mesageTag?.images??null,
                productId:mesageTag?.product?._id??null,
                attributeId:mesageTag?.attribute?._id??null
            }
            chatMutation.mutate({ action: 'send', data: newMessage })
            reset()
            dispath(setMesageTag(null))
        }

    }
    return (
        <>
            {mesageTag && ( <MessageTag />)}
            <form onSubmit={handleSubmit(onSendMessage)} className="flex gap-2 items-center p-3 border-t border-gray-300">
                <Upload className='pr-3'>
                    <PlusOutlined className=' cursor-pointer' />
                </Upload>
                <textarea
                    {...register('message', { required: true })}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 resize-none text-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <button
                    type="submit"
                    className='hover:text-blue'
                >
                    <SendOutlined />
                </button>
            </form>
        </>
    )
}

export default InputMessage