import React from 'react'
import usePermissionCheck from '../hook/usePermissionCheck'

function ProtectedPermissionRoute({Component,permission}) {
  const isAccessable=usePermissionCheck(permission)
  if(!isAccessable){
    return;
  }
  return <Component/>
}

export default ProtectedPermissionRoute