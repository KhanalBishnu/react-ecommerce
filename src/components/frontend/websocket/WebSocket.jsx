import React, { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const WebSocket = () => {
  // Step 1: Define state to hold the dynamic data
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Step 2: Initialize Laravel Echo with Pusher
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: 'local', // Matches the key in .env
      wsHost: window.location.hostname,
      wsPort: 6001, // WebSocket port (matches the .env configuration)
      forceTLS: false, // No TLS for local development
      disableStats: true, // Disable Pusher stats collection
      enabledTransports: ['ws', 'wss'] // Only use WebSocket transports
    });

    // Step 3: Listen for the event and update the state dynamically
    window.Echo.channel('chat-data') // Replace with your channel name
      .listen('NotificationTest', (e) => {
        console.log('WebSocket event data:', e);
        setEventData(e); // Update state with event data
      });

    // Cleanup when component unmounts
    return () => {
      window.Echo.leave('chat-data');
    };
  }, []);

  return (
    <div>
      <h1>React WebSocket with Laravel Echo</h1>
      
      {/* Step 4: Render dynamic data */}
      {eventData ? (
        <div>
          <h2>New Event Data Received:</h2>
          <pre>{JSON.stringify(eventData, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for events...</p>
      )}
    </div>
  );
}

export default WebSocket;
