import { useContext, useEffect, useState } from "react"
import useChatQuery from "../../../common/hooks/chats/useChatQuery"
import Conversation from "./component/Conversation"
import InputSendMessgae from "./component/InputSendMessgae"
import ListMember from "./component/ListMember"
import { Ichatmember } from "../../../common/interfaces/chat"
import { Iuser } from "../../../common/interfaces/auth"
import { AppContext } from "../../../common/contexts/AppContextProvider"


const ChatWidget = () => {
    const [chats,setChats] = useState([] as Ichatmember[] )
    const [chatId,setChatId] = useState<string|null>(null)
    const [userMessage,setUserMessage] = useState<Iuser|null>(null)
    const {socket} = useContext(AppContext)
    const chatQuery = useChatQuery({isAdmin:true})
   useEffect(()=>{
    if(chatQuery?.data && chatQuery?.data?.length > 0){
        setChats(chatQuery?.data)
    }
   },[chatQuery?.data])

   useEffect(()=>{
    if(socket?.current){
        socket?.current.on("newChat",(newChat:Ichatmember)=>{
            console.log(chats)
            setChats([newChat,...chats])
        })
    }
   },[socket,chats])

    return (
        <div className="h-full flex">
            {/* Friends List */}
            <ListMember listChat={chats} setChatId={setChatId} chatId={chatId} setUserMessage={setUserMessage} />

            {/* Chat Box */}
            <div className="w-3/4 flex flex-col">

                <div className="flex-grow p-4 bg-gray-50 ">
                    <div className="bg-white p-3 rounded-md shadow-md h-full">
                        {/* Chat messages go here */}
                        <div className="h-full flex flex-col">
                            {/* hôp thoại chat */}
                            <Conversation chatId={chatId} userMessage={userMessage} />
                            {/* Input Box */}
                            <InputSendMessgae chatId={chatId} userMessage={userMessage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWidget