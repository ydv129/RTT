const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());





app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.set('view engine', 'ejs');
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});