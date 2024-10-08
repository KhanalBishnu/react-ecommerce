import { Children, createContext, useState } from "react";

// create context 
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(null);

    const login=(newToken)=>{
        setToken(newToken);
    }
    const logout=()=>{
        setToken(null);
    }
    return (
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}