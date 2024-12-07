/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react"
import useMessageQuery from "../../../../common/hooks/chats/useMessageQuery"
import { Imesage } from "../../../../common/interfaces/message"
import { Iuser } from "../../../../common/interfaces/auth"
import { AppContext } from "../../../../common/contexts/AppContextProvider"
import MessageAdmin from "./MessageAdmin"
type Props = {
    chatId: null | string,
    userMessage: Iuser | null
}
const Conversation = ({ chatId, userMessage }: Props) => {
    const [messages, setMessages] = useState([] as Imesage[])
    const messengeQuery = useMessageQuery(chatId)
    const {currentUser,socket} = useContext(AppContext)
    const checkBoxRef = useRef<any>()
    useEffect(() => {
        if (messengeQuery?.data && messengeQuery?.data?.length > 0) {
            setMessages(messengeQuery?.data)
        }
    }, [messengeQuery?.data , chatId])
    useEffect(()=>{
        if(socket?.current){
            socket?.current?.on("newMessage",(newMessage:Imesage)=>{
                console.log('Đã vào')
                if(newMessage.chatId == chatId){
                    setMessages([...messages,newMessage])
                }
            })
        }
    },[messages, socket?.current])
    useEffect(() => {
        checkBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])
    return (
        <div className="flex-grow ">
            <h2 className="text-xl font-semibold mb-2 border-b-2 ">
                {userMessage ? (<>
                    <span className="text-red"> {userMessage?.lastname} {userMessage?.firstname}</span>
                </>)
                    :
                    (<>Vui lòng chọn người cần liên hệ</>)}
            </h2>
         
            <div className="flex flex-col w-full h-[450px] overflow-y-auto">
                {
                    messages?.map((message: Imesage) => (
                        <MessageAdmin currentUser={currentUser} checkBoxRef={checkBoxRef} message={message} key={message?._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Conversation