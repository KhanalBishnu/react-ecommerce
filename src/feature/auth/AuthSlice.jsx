import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        token:JSON.parse(localStorage.getItem('token')) || null
    },
    reducers:{
        setToken(state,action){
            state.token=action.payload
            localStorage.setItem('token',JSON.stringify(action.payload))
        },
        removeAuthToken(state){
            state.token=null,
            localStorage.removeItem('token')
        }
    }
})
export const {token,setToken,removeAuthToken}=AuthSlice.actions;
export default AuthSlice.reducer;