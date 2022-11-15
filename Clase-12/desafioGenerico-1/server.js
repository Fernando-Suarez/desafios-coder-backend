// En base a lo desarrollado en clase, realizar una aplicación basada en node.js, express y websocket que permita generar un chat colaborativo entre usuarios conectados.
// Cada usuario podrá ingresar su nombre y mensaje a través de un formulario y enviar la información utilizando el canal de websocket.
// Los mensajes serán presentados en tiempo real en cada uno de los clientes.
// Cuando un usuario nuevo se conecte, recibirá todos los mensajes hasta ahí ingresados.
// Los mensajes persistirán en memoria del servidor.

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const messages = require('./db/db.js');

//* Instancia

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//* Middleware

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*render html
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
});

//* servidor
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () =>
	console.log(`Servidor escuchado en el puerto http://localstore:${PORT}`)
);

//* sockets
io.on('connection', (socket) => {
	console.log('Un Cliente se ha Conectado');
	socket.emit('messages', messages);

	socket.on('new-message', (data) => {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});
