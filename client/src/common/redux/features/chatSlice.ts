/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { messageTag } from "../../interfaces/message"



const initialState = {
    messageTag:null as any as messageTag,
    openChat:false
}
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      setMesageTag: (state,action) =>{
           state.messageTag = action.payload
      },
      setOpenChat: (state,action) =>{
        state.openChat = action.payload
   },
    }
})
export const {setMesageTag,setOpenChat} = chatSlice.actions

export default chatSlice.reducer