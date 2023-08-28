const socketIo = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (message) => {
      // Broadcast the message to all connected clients
      io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io; 
};

module.exports = initializeSocket;
