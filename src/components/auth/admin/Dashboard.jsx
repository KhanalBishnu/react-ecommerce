import React from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from './layout/Navbar'

function Dashboard() {
  return (
    <div className='container-fluid'>
        <div className="row">
           {/* <Navbar/> */}
           <Sidebar/>
        </div>
    </div>
  )
}

export default Dashboard