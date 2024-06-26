import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem('token') || null
    },
    reducers:{
        setToken(state,action){
            state.token=action.payload
            localStorage.setItem('token',action.payload)
        },
        removeToken(state){
            state.token=null,
            localStorage.removeItem('token')
        }
    }
})
export const {token,setToken}=AuthSlice.actions;
export default AuthSlice.reducer;