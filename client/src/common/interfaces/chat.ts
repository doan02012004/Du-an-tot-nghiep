import { Iuser } from "./auth"

export interface Ichat {
    _id?: string
    senderId?: string
    receiverId?: string|number,
    message?: string
    chatId?: string
    createdAt?: string
    updatedAt?: string
}

export interface Ichatmember{
    _id?:string
    members?:Iuser[]
}