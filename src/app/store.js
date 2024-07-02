import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../feature/auth/AuthSlice";
import PermissionReducer from '../feature/permission/PermissionAuthSlice';

export  const store=configureStore({
    reducer:{
        auth:AuthReducer,
        permissions:PermissionReducer
    }
})
export default store;