import instance from "../common/config/axios"
import { Iaddress } from "../common/interfaces/address"

export const getAllAddressByUserId = async(userId?:string) =>{
    try {
        const res = await instance.get(`/addresses/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createAddress = async(option:Iaddress) =>{
    try {
        const res = await instance.post(`/addresses`, option)
        return res.data
    } catch (error) {
        console.log(error)
    }
}