/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../common/contexts/AppContextProvider"
import useMessageQuery from "../../../../common/hooks/chats/useMessageQuery"
import { Imesage } from "../../../../common/interfaces/message"
import Message from "./Message"
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
    useEffect(()=>{

    },[checkBoxRef])
    return (
        <div className="flex flex-col flex-1 overflow-y-scroll border border-gray-300 p-4  relative">
            {messages?.map((message: Imesage) => (
                <Message key={message._id} checkBoxRef={checkBoxRef} currentUser={currentUser} message={message}/>
            ))}
        </div>
    )
}

export default Conversation