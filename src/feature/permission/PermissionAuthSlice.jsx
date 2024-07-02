import { createSlice } from "@reduxjs/toolkit";

const PermissionAuthSlice=createSlice({
    name:'permissions',
    initialState:{
        list:[]
    },
    reducers:{
        setPermission:(state,action)=>{
            state.list=action.payload
        }
    }
})
export const {setPermission}=PermissionAuthSlice.actions;
export default PermissionAuthSlice.reducer;
