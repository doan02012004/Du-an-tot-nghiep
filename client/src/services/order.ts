/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios"

export const createOrder = async(option:any) =>{
    try {
        const res = await instance.post('/orders',option)
        return res.data
    } catch (error) {
        return error
    }
}