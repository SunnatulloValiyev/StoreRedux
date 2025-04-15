import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/feature/CartSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default store;
