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
 
  // useEffect(() => {
  //   window.Echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: 'local', // Use your Pusher key from the .env
  //     cluster: 'mt1', // Add the Pusher cluster (e.g., 'mt1', replace with your actual cluster)
  //     wsHost: window.location.hostname,
  //     wsPort: 6001, // WebSocket port (matches the .env configuration)
  //     forceTLS: false, // Disable TLS for local development
  //     disableStats: true, // Disable Pusher stats collection
  //     enabledTransports: ['ws', 'wss'] // Only use WebSocket transports
  //   });

  //   window.Echo.channel('chat-data') // Replace with your channel name
  //     .listen('NotificationTest', (e) => {
  //       console.log('WebSocket event data:', e);
  //     });

  //   // Cleanup WebSocket connection on component unmount
  //   return () => {
  //     window.Echo.leave('chat-data');
  //   };
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
