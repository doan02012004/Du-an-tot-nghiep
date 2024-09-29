/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserOutlined } from '@ant-design/icons'
import { Ichatmember } from '../../../../common/interfaces/chat'
import { useContext, useEffect, useState } from 'react'
import { Iuser } from '../../../../common/interfaces/auth'
import { Imesage } from '../../../../common/interfaces/message'
import useMessageQuery from '../../../../common/hooks/chats/useMessageQuery'
import { useQuery } from '@tanstack/react-query'
import { getLastMessage } from '../../../../services/chat'
import { AppContext } from '../../../../common/contexts/AppContextProvider'
type Props = {
    chat : Ichatmember,
    setChatId:any,
    setUserMessage:any,
    chatId:null|string
}

const Member = ({chat,setChatId,chatId,setUserMessage}:Props) => {
    const [user,setUser] = useState<Iuser|null>(null)
    const [lastMessage,setLastMessage] = useState<Imesage|null|any>(null)
    const {socket} = useContext(AppContext)
    const lastMessageQuery = useQuery({
        queryKey:['LASTMESSAGE',chat?._id],
        queryFn: async() =>{
            try {
                const data = await getLastMessage(chat?._id)
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!chat?._id
    })
    useEffect(()=>{
        if(chat){
            const currentUser = chat?.members?.find((user:Iuser) => user.role === "user") as Iuser
          setUser(currentUser)
        }
    },[chat])
    useEffect(()=>{
        if(lastMessageQuery?.data ){
            setLastMessage(lastMessageQuery.data)
        }
    },[lastMessageQuery?.data])
    useEffect(()=>{
        if(socket?.current){
            socket?.current?.on("newMessage",(newMessage:Imesage)=>{
                if(newMessage.chatId == chat?._id){
                    setLastMessage(newMessage)
                }
               
            })
        }
    },[lastMessage, socket])
    const onHandeSet = () =>{
        if(chatId !== chat?._id){
            setChatId(chat?._id)
        }
        if(user){
            setUserMessage(user)
        }
    }
   
  return (
    <div className='w-full border-b p-1 flex' onClick={onHandeSet}>
        <div className='size-11 rounded-full border border-dark flex items-center justify-center'>
           <UserOutlined className=' text-3xl ' />
        </div>
        <div className='ml-3 relative'>
            <div className=' absolute top-2 right-2 size-2 rounded-full bg-red '></div>
            <h3 className='text-base font-semibold  m-0 '>{user?.lastname } {user?.firstname}</h3>
            <p className='overflow-hidden text-ellipsis whitespace-nowrap w-40 text-sm font-medium text-gray-500'>{lastMessage?.sender == user?._id? `${lastMessage?.message}`:`Bạn: ${lastMessage?.message}`}</p>
        </div>
    </div>
  )
}

export default Member