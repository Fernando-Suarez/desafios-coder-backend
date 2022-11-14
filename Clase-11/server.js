const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* IMPLEMENTACION DE SOCKET.IO

const { Server } = require('socket.io');
const io = new Server(server);

io.on('connect', (socket) => {
	console.log('un usuario se ha conectado');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
