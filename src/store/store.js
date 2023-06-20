import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./uiSlice";
import authSlice from "./authSlice";


const store = configureStore({
    reducer:{
        ui: uiSlice,
        auth: authSlice
    }
})

export default store;

export const state = store.getState()
