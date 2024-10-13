import { createSlice } from "@reduxjs/toolkit"
import { IcartItem } from "../../interfaces/cart"

const initialState = {
    carts: [] as IcartItem[],
    totalProduct:0 as number,
    totalCart:0 as number
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCarts: (state,action)=>{
            state.carts = action.payload
        },
        setTotalProduct: (state,action)=>{
            state.totalProduct = action.payload
        },
        setTotalCart: (state,action)=>{
            state.totalCart = action.payload
        },
    }
})
export const {setCarts,setTotalCart,setTotalProduct} = cartSlice.actions

export default cartSlice.reducer