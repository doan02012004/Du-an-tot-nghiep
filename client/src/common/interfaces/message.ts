import { Iuser } from "./auth"
import { Iattribute, Iproduct } from "./product"

export interface Imesage {
    _id?: string
    sender?: Iuser
    receiver?: Iuser
    message?: string
    chatId?: string
    isRead?:boolean
    createdAt?: string
    updatedAt?: string
}

export interface messageTag {
    type:"product"|'image'|'message',
    image?:string,
    product?:Iproduct,
    attribute?:Iattribute,
    message?:Imesage
}