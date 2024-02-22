import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState();
  const [newUser, setNewUser] = useState('');
  const [isChangeName, setChangeName] = useState(false);

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('user connected', (user) => {
      setOnlineUsers([...onlineUsers, user]);
    });

    socket.on('user disconnected', (user) => {
      setOnlineUsers([...onlineUsers, user]);
    });

    // Clean up the event listeners when the component unmounts.
    return () => {
      socket.off('chat message');
      socket.off('user connected');
      socket.off('user disconnected');
    };
  }, [messages, onlineUsers]);


  const sendMessage = () => {
    socket.emit('chat message', newMessage, username);
    setNewMessage('');
  };

  const addUser = () => {
    socket.emit('user connected', username);
    setNewUser(username)
  };


  return (
    <>
      {newUser ?
        <>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 15,
              pb: 4,
            }}
          >
            {isChangeName ? <><TextField
              type="text"
              value={newMessage}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ left: '50px', position: 'sticky' }}
            /><br /></> : null}

            <Button onClick={() => setChangeName(!isChangeName)}>Change username</Button><br />
            <div id='onlineUsers'>
              Online:
              <ul>
                {onlineUsers.map((user, index) => (
                  <li key={index}>
                    {username===user ? `${user} - you` : user}
                  </li>
                ))}
              </ul>
            </div>

            <ul id='messages'>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <TextField
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            /><br />
            <Button onClick={sendMessage}>Send</Button>
          </Box>
        </> : <>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 15,
              pb: 4,
            }}
          >
            <TextField
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            /><br />
            <Button onClick={() => addUser(username)}>Set username</Button>
          </Box>
        </>
      }

    </>
  );
}

export default ChatApp;
