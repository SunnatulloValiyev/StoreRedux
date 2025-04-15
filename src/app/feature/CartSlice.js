import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
    cart: loadCartFromLocalStorage(),
    totalAmount: 0,
    totalPrice: 0,
};

const updateLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const existingItem = state.cart.find((item) => item.id === payload.id);
            if (existingItem) {
                existingItem.amount += 1;
            } else {
                state.cart.push({ ...payload, amount: 1 });
            }
            updateLocalStorage(state.cart);
        },
        
        increment: (state, { payload }) => {
            const item = state.cart.find((i) => i.id === payload);
            if (item) {
                item.amount += 1;
            }
            updateLocalStorage(state.cart);
        },  
        decrement: (state, { payload }) => {
            const item = state.cart.find((i) => i.id === payload);
            if (item && item.amount > 1) {
                item.amount -= 1;
            }
            updateLocalStorage(state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
            updateLocalStorage(state.cart);
        },
        deleteCart: (state, { payload }) => {
            state.cart = state.cart.filter((item) => item.id !== payload);
            updateLocalStorage(state.cart);
        },
    }
});

export const { addToCart, increment, decrement, clearCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
