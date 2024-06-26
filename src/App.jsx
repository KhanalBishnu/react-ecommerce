import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './protected/ProtectedRoute'
import Dashboard from './components/auth/admin/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/sign-up' element={<Signup/>} />
          <Route path='/dashboard' element={<ProtectedRoute Component={Dashboard} />}>

          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
