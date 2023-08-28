import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    setNewMessage('');
  };
  

  return (
    <>
    <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 20,
                    pb: 4,
                }}
            >
                <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      /><br/>
      <button onClick={sendMessage}>Send</button>
            </Box>    
    </>
  );
}

export default ChatApp;
