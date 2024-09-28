/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../../../common/contexts/AppContextProvider"
import useMessageQuery from "../../../../common/hooks/chats/useMessageQuery"
import { Imesage } from "../../../../common/interfaces/message"
type Props = {
    chatId: string
}
const Conversation = ({ chatId }: Props) => {
    const { currentUser } = useContext(AppContext)
    const messageQuery = useMessageQuery(chatId)
    const checkBoxRef = useRef<any>()
    console.log(messageQuery)
    useEffect(() => {
        checkBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageQuery?.data])
    return (
        <div className="flex flex-col flex-1 overflow-y-scroll border border-gray-300 p-4">
            {messageQuery?.data?.map((message: Imesage) => (
                <div ref={checkBoxRef} key={message?._id} className={`${currentUser?._id == message?.sender?._id ? "self-end text-white bg-blue" : "self-start text-dark bg-gray-200"} mb-2 px-3 py-2 border rounded-full w-max text-base  font-medium`}>{message.message}</div>
            ))}
        </div>
    )
}

export default Conversation