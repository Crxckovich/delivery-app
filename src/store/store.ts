import {configureStore} from "@reduxjs/toolkit";
import UserSlice, {JWT_PERSISTENT_STATE} from "./user.slice.ts";
import {saveState} from "./storage.ts";
import CartSlice, {CART_PERSISTENT_STATE} from "@/store/cart.slice.ts";


export const store = configureStore({
    reducer: {
        user: UserSlice,
        cart: CartSlice
    }
});

store.subscribe(() => {
    saveState({jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE)
    saveState(store.getState().cart, CART_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;