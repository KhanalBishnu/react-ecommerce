import React from 'react'
import { useSelector } from 'react-redux'

function AdminHome() {
    const permissions=useSelector((state)=>state.permissions.list)
  return (
    <div>
       <h2>Welcome to Dashboard</h2>
    </div>
  )
}

export default AdminHome