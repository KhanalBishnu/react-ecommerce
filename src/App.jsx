import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './protected/ProtectedRoute'
import Dashboard from './components/auth/admin/Dashboard'
import AdminHome from './components/auth/admin/AdminHome'
import ProtectedPermissionRoute from './protected/ProtectedPermissionRoute'
import Index from './components/auth/roleAndPermission/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/sign-up' element={<Signup/>} />
          {/* <Route  path='/dashboard' element={<Dashboard/>} /> */}
          <Route path='/dashboard' element={<ProtectedRoute Component={Dashboard} />}>
            <Route path='home' element={<AdminHome />}>
            </Route>
            <Route path='role-permission' element={<ProtectedPermissionRoute permission='View|Role And Permission' Component={Index} />}> 

            </Route>

          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
