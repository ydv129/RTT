const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Send a welcome message to the connected client
    socket.emit('message', 'Welcome!');

    // Handle incoming chat messages
    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    // Handle location sharing
    socket.on('sendLocation', (location) => {
        console.log(`Location received: ${location.latitude}, ${location.longitude}`);
        io.emit('Location-received', { id: socket.id, ...location });
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});