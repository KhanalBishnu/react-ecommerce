import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../feature/auth/AuthSlice";

export  const store=configureStore({
    reducer:{
        auth:AuthReducer,
    }
})
export default store;