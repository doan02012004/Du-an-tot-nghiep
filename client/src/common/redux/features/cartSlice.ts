import { createSlice } from "@reduxjs/toolkit"
import { IcartItem } from "../../interfaces/cart"

const initialState = {
    carts: [] as IcartItem[], // sản phẩm trong giỏ hàng
    totalProduct:0 as number, // tổng số lượng sản phẩm
    totalCart:0 as number, // tổng giá đơn hàng
    voucher: null, // mã giảm giá
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
        setVoucher: (state,action)=>{
            state.voucher = action.payload
        },
        setTotalSubmit: (state,action)=>{
            state.totalSubmit = action.payload
        }
        
    }
})
export const {setCarts,setTotalCart,setTotalProduct,setVoucher,setTotalSubmit} = cartSlice.actions

export default cartSlice.reducer