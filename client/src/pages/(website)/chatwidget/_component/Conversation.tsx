/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../common/contexts/AppContextProvider"
import useMessageQuery from "../../../../common/hooks/chats/useMessageQuery"
import { Imesage } from "../../../../common/interfaces/message"
type Props = {
    chatId: string
}
const Conversation = ({ chatId }: Props) => {
    const [messages, setMessages] = useState([] as Imesage[])
    const { currentUser,socket } = useContext(AppContext)
    const messengeQuery = useMessageQuery(chatId)
    const checkBoxRef = useRef<any>()
    useEffect(() => {
        if (messengeQuery?.data && messengeQuery?.data?.length > 0) {
            setMessages(messengeQuery?.data)
        }
    }, [messengeQuery?.data])
    useEffect(()=>{
        if(socket?.current){
            socket?.current?.on("newMessage",(newMessage:Imesage)=>{
                if(newMessage.chatId == chatId){
                    setMessages([...messages,newMessage])
                }
               
            })
        }
    },[messages, socket])
    useEffect(() => {
        checkBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])
    return (
        <div className="flex flex-col flex-1 overflow-y-scroll border border-gray-300 p-4">
            {messages?.map((message: Imesage) => (
                <div ref={checkBoxRef} key={message?._id} className={`${currentUser?._id == message?.sender?._id ? "self-end text-white bg-blue" : "self-start text-dark bg-gray-200"} mb-2 px-3 py-2 border rounded-full w-max text-base  font-medium`}>{message.message}</div>
            ))}
        </div>
    )
}

export default Conversation