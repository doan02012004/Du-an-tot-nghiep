import { Iuser } from "./auth"
import { Iproduct } from "./product"

export interface Ichat {
    _id?: string
    senderId?: string
    receiverId?: string|number,
    message?: string,
    chatId?: string,
    productId?: string | Iproduct,
    attributeId?:string,
    images:string[],
    type:'product'|'message'
    createdAt?: string,
    updatedAt?: string,
}

export interface Ichatmember{
    _id?:string
    members?:Iuser[]
}