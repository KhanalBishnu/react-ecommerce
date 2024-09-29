import React, { useEffect } from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from './layout/Navbar'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


window.Pusher = Pusher;
function Dashboard() {
  const REACT_APP_API_URL='http://127.0.0.1:8000/api'
  debugger

  const userId=JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: 'local', // Make sure this matches PUSHER_APP_KEY in your .env
      cluster: 'mt1', // Ensure cluster matches your .env
      wsHost: window.location.hostname, // Usually '127.0.0.1' for local
      wsPort: 6001, // WebSocket port
      forceTLS: false, // Disable TLS for local
      disableStats: true, // Prevent sending usage statistics
      auth: {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`, // Ensure the token is properly stored
        },
      },
      authEndpoint: `${REACT_APP_API_URL}/broadcasting/auth`, // Ensure REACT_APP_API_URL is set correctly
    });
  
    window.Echo.private(`private-event.${userId}`) // Make sure userId is defined
      .listen('PrivateEventTest', (event) => {
        console.log('WebSocket data received:', event); // Debug event data
      });
  
    // Cleanup WebSocket connection when component unmounts
    return () => {
      window.Echo.leave(`private-event.${userId}`);
    };
  }, [userId]); // Ensure userId is properly available and passed
  
  
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