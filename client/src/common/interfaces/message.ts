import { Iuser } from "./auth"

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