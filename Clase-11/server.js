//https://socket.io/docs/v4/server-initialization/
const express = require('express');
const app = express();

//IMPLEMENTACION
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(8080, () => console.log('SERVER ON http://localhost:8080'));

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
});

const msgs = [];

io.on('connect', (socket) => {
	console.log('nuevo usuario conectado');
	// atajo los msgs que me manda el front
	socket.on('msg', (data) => {
		msgs.push({ ...data });
		io.sockets.emit('msg-list', msgs);
	});
	socket.emit('msg', 'hola front!');
});
