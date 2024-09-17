import instance from "../common/config/axios"
import { InewCart } from "../common/interfaces/cart"

export const addToCart = async (option: { userId: string, newCart:InewCart }) => {
    try {
        const res = await instance.post(`/carts/addtocart/${option.userId}`, option.newCart)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const getCart = async (userId: string) => {
    try {
        const res = await instance.get(`/carts/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}   