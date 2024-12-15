import instance from "../common/config/axios"
export const addToCart = async (option: { userId?: string,productId?:string,attributeId?:string,quantity?:number,galleryId?:string}) => {
    try {
        const res = await instance.post(`/carts/addtocart`, option)
        return res.data
    } catch (error) {
        return error
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

export const increaseProductCartQuantity = async (option: { userId?: string,productId?:string,attributeId?:string})=>{
    try {
        const res = await instance.post(`/carts/increase`, option)
        return res
    } catch (error) {
        // console.log(error)
        return error
    }
}

export const decreaseProductCartQuantity = async (option: { userId?: string,productId?:string,attributeId?:string})=>{
    try {
        const res = await instance.post(`/carts/decrease`, option)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const onInputProductCartQuantity = async (option: { userId?: string,productId?:string,quantity?:number,attributeId?:string})=>{
    try {
        const res = await instance.post(`/carts/oninput`, option)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const removeProductCartQuantity = async (option: { userId?: string,productId?:string,attributeId?:string})=>{
    try {
        const res = await instance.post(`/carts/remove`, option)
        return res.data
    } catch (error) {
        console.log(error)
    }
}