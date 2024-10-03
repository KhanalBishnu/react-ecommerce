import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './protected/ProtectedRoute'
import Dashboard from './components/auth/admin/Dashboard'
import AdminHome from './components/auth/admin/AdminHome'
import ProtectedPermissionRoute from './protected/ProtectedPermissionRoute'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './constant/axios'
import API_URLS from './constant/Constant'
import { setPermission } from './feature/permission/PermissionAuthSlice'
import { SwalMessage } from './components/swal/SwalMessage'
import Spinner from './components/spinner/Spinner'
import UserData from './components/auth/admin/userManagement/UserData'
import RolePermissionData from './components/auth/admin/roleAndPermission/RolePermissionData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CategoryProduct from './components/auth/admin/categoryProduct/CategoryProduct'
import Home from './components/frontend/Home'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


window.Pusher = Pusher;
function App() {
  const [eventData, setEventData] = useState(null);
 
//   useEffect(() => {
//     // Initialize Laravel Echo with Pusher
//     const echo = new Echo({
//         broadcaster: 'pusher',
//         key: '9e28377bbc0003448d60', // Replace with your Pusher App Key
//         cluster: 'mt1',
//         wsHost: window.location.hostname,
//         wsPort: 6001,
//         forceTLS: false,
//         disableStats: true,
//         authEndpoint: `http://localhost:8000/api/broadcasting/auth`,
//         auth: {
//             headers: {
//                 Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`, // Use token for private channels
//             },
//         },
//     });
//     const userId=JSON.parse(localStorage.getItem('userId'));

//     // Listen to a private channel
//     echo.private(`private-event.${userId}`)
//         .listen('PrivateEventTest', (event) => {
//             console.log('WebSocket data received:', event);
//             alert('Private message received: ' + event);
//         })
//         .error((error) => {
//             console.error('WebSocket error:', error);
//         });

//     return () => {
//         // Disconnect on component unmount
//         echo.disconnect();
//     };
// }, []);
  // after refresh get all auth user permission 
  const token = useSelector((state) => state.auth.token)
  const [loading, setLoading] = useState(!!token);
  const dispatch = useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    if (token) {
      getOwnPermission()
    }
  }, [])
  const getOwnPermission = async () => {
    try {
      setLoading(true);
      const response = await getData(API_URLS.OwnPermission, setLoading);
      if (response.response) {
        setLoading(false);
        dispatch(setPermission(response.data));
      }
      else {
        setLoading(false);
        SwalMessage('Error', response.message || 'Something went wrong!', 'error');
        navigate('/login')
      }

    } catch (error) {
      setLoading(false);
      SwalMessage('Error', error.message || 'Something went wrong!', 'error');
      navigate('/login')
    }
  }

  if (loading) {
    return <Spinner content="Loading..." /> 

  }
  return (
<>
<ToastContainer/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/dashboard' element={<ProtectedRoute Component={Dashboard} />}>
        <Route path='home' element={<AdminHome />}>
        </Route>
        <Route path='role-permission' element={<ProtectedPermissionRoute permission='View|Role And Permission' Component={RolePermissionData} />}>
        </Route>
        <Route path='user-management' element={<ProtectedPermissionRoute permission='View|User Management' Component={UserData} />}>
        </Route>
        <Route path='category-product' element={<ProtectedPermissionRoute permission='View|Category Product' Component={CategoryProduct} />}>
        </Route>
      </Route>
\
    </Routes>
    </>
  )
}

export default App
