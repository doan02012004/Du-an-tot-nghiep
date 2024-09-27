import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalCart: 0 as number
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalCart: (state,action)=>{
            state.totalCart = action.payload
        }
    }
})
export const {setTotalCart} = cartSlice.actions

export default cartSlice.reducer