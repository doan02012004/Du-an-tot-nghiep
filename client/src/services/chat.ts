import instance from "../common/config/axios"

export const sendMessage = async (option: { senderId?: string, receiverId?: string, message?: string, chatId?: string }) => {
    try {
        const res = await instance.post('/chats/send', option)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const findChatAdmin = async (userId?:string) => {
    try {
        const res = await instance.get(`/chats/chatadmin/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const findChatUser = async (option:{senderId?:string,reciverId?:string}) => {
    try {
        const res = await instance.get(`/chats/chatuser/${option.senderId}/${option.reciverId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getMessage = async (chatId?:string) => {
    try {
        const res = await instance.get(`/chats/messages/${chatId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getLastMessage = async (chatId?:string) => {
    try {
        const res = await instance.get(`/chats/lastmessage/${chatId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const createChat = async (data:{senderId?:string, receiverId?:string}) => {
    try {
        const res = await instance.post(`/chats/create`,data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
