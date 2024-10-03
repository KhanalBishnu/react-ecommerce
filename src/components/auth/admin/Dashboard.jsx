import React, { useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

function Dashboard() {
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = JSON.parse(localStorage.getItem('token')); // Ensure token is set
  
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '9e28377bbc0003448d60',
      cluster: 'mt1',
      forceTLS: false,
      wsHost: "127.0.0.1",
      wsPort: 6001,
      disableStats: true,
      authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      namespace: 'App.Events',
    });
  
    window.Echo.private(`messages.${userId}`)
      .listen('MessageSent', (e) => {
        // Debounce logic can be applied here if messages come in rapidly
        console.log('Private Message:', e);
      });
  
    window.Echo.connector.pusher.connection.bind('state_change', (states) => {
      console.log(`Connection state changed from ${states.previous} to ${states.current}`);
    });
  
    window.Echo.connector.pusher.connection.bind('error', (error) => {
      console.error("WebSocket error: ", error);
    });
  
    return () => {
      // Cleanup when component unmounts
      window.Echo.leaveChannel(`messages.${userId}`);
    };
  }, []);
  
  return (
    <div className='container-fluid'>
      <div className="row">
        {/* <Navbar /> */}
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
