import { createSlice } from "@reduxjs/toolkit"
import { Iattribute, Igallery, IproductInfor } from "../../interfaces/product"

const initialState = {
    productInfor:{} as IproductInfor,
    gallerys:[] as Igallery[],
    attributes:[] as Iattribute[]
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProductInfor: (state, action) =>{
            state.productInfor = action.payload
        },
        setGallerys:(state, action) =>{
            state.gallerys = action.payload
        },
        setAttributes:(state, action) =>{
            state.attributes = action.payload
        },
    }
})

export const {setProductInfor,setGallerys,setAttributes} = productSlice.actions

export default productSlice.reducer