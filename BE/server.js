const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const socketIo = require('socket.io');
const redis = require("redis"); // Require the redis package


var corsOptions = {
    origin: "http://localhost:5173"
};

const Controllers = require('./controllers')
const app = express();

const client = redis.createClient({
    host: process.env.REDIS_HOST || "127.0.0.1", // Redis server host
    port: process.env.REDIS_PORT || 6379,       // Redis server port
});

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server, {cors: {
    origin: "http://localhost:5173", // Allow requests from your React app
    methods: ["GET", "POST"]
  }});

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


let dbConnect = require("./dbConnect");

// parse requests of content-type -application/json
app.use(express.json());

let debtRoutes = require('./routes/debtRoutes')
app.use('/api/debts', debtRoutes)

let userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running onport ${PORT}.`);
});

server.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
});
