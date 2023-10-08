const socketIo = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(socket.id,'A user connected');

    socket.on('chat message', (message, user) => {
      // Broadcast the message to all connected clients
      io.emit('chat message',user+': '+ message);
    });

    socket.on('user connected', (newUser) => {
      // Broadcast the message to all connected clients
      console.log(`${newUser} has joined the chat`)
      io.emit('user connected', newUser);
      io.emit('chat message', `${newUser} has joined the chat`);
    });

    socket.on('user disconnected', (user) => {
      // Broadcast the message to all connected clients
      console.log(`${user} has joined the chat`)
      // io.emit('chat message', `${user} has left the chat`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io; 
};

module.exports = initializeSocket;
