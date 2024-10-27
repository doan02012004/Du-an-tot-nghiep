import { createSlice } from "@reduxjs/toolkit"
import { IcartItem } from "../../interfaces/cart"

const initialState = {
    carts: [] as IcartItem[],
    totalProduct: 0 as number,
    totalCart: 0 as number,
    totalSubmit: 0 as number, // tổng giá cuối cùng khi tính toán giảm giá và phí vận chuyển
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload
        },
        setTotalProduct: (state, action) => {
            state.totalProduct = action.payload
        },
        setTotalCart: (state, action) => {
            state.totalCart = action.payload
        },
        setTotalSubmit: (state, action) => {
            state.totalSubmit = action.payload
        }
    }
})
export const { setCarts, setTotalCart, setTotalProduct, setTotalSubmit } = cartSlice.actions

export default cartSlice.reducer