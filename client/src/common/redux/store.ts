import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './features/productSlice'
const rootReducer = combineReducers({
    product:productReducer
})
const store = configureStore({
    reducer: rootReducer
})

export default store