import instance from "../common/config/axios"
import { Iproduct } from "../common/interfaces/product"

export const getProducts = async()=> {
    try {
        const res = await instance.get('/products')
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const addProduct = async(product:Iproduct)=>{
    try {
        const res = await instance.post('/products',product)
        return res.data
    } catch (error) {
        console.log(error)
    }
}