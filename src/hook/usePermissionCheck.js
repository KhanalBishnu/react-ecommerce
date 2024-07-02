import React from 'react'
import { useSelector } from 'react-redux'

const usePermissionCheck=()=>{
    const permissions=useSelector((state)=>state.permissions.list);
    
    const hasPermission=(permissions,requiredPermission)=>{
        return permissions.includes(requiredPermission);
    }
    const checkPermission=(requiredPermission)=>{
        return hasPermission(permissions,requiredPermission)
    }

    return {checkPermission}
}

export default usePermissionCheck