/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react"
import useMessageQuery from "../../../../common/hooks/chats/useMessageQuery"
import { Imesage } from "../../../../common/interfaces/message"
import { Iuser } from "../../../../common/interfaces/auth"
import { AppContext } from "../../../../common/contexts/AppContextProvider"
type Props = {
    chatId: null | string,
    userMessage: Iuser | null
}
const Conversation = ({ chatId, userMessage }: Props) => {
    const [messages, setMessages] = useState([] as Imesage[])
    const messengeQuery = useMessageQuery(chatId)
    const {adminId,socket} = useContext(AppContext)
    const checkBoxRef = useRef<any>()
    useEffect(() => {
        if (messengeQuery?.data && messengeQuery?.data?.length > 0) {
            setMessages(messengeQuery?.data)
        }
    }, [messengeQuery?.data , chatId])
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
        <div className="flex-grow ">
            <h2 className="text-xl font-semibold mb-2 border-b-2 ">
                {userMessage ? (<>
                    Chat with
                    <span className="text-red"> {userMessage?.lastname} {userMessage?.firstname}</span>
                </>)
                    :
                    (<>Vui lòng chọn người cần liên hệ</>)}
            </h2>
         
            <div className="flex flex-col w-full h-[450px] overflow-y-auto">
                {
                    messages?.map((message: Imesage) => (
                        <div ref={checkBoxRef} key={message?._id} className={`${adminId == message?.sender?._id ? "self-end text-white bg-blue" : "self-start text-dark bg-gray-200"} mb-2 px-3 py-2 border rounded-full w-max text-base  font-medium`}>
                            {message?.message}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Conversation