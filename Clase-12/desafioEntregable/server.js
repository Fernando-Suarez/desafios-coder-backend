//* modulos

const express = require('express');
const Contenedor = require('./api/contenedor.js');
// const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Instancias
const app = express();

const contenedor = new Contenedor('./db/productos.json');
const contenedorMensajes = new Contenedor('./db/mensajes.json');
const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* Servidor
const PORT = process.env.PORT || 8080;
HTTPserver.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* funciones socket productos
const enviarProductosSocket = async (socket) => {
	const productos = await contenedor.getAll();
	socket.emit('lista productos', productos);
};

const guardarProducto = async (nuevoProducto) => {
	await contenedor.save(nuevoProducto);
	const productos = await contenedor.getAll();
	io.sockets.emit('lista productos', productos);
};

//* funciones socket chat
const enviarMensajesSocket = async (socket) => {
	const mensajes = await contenedorMensajes.getAll();
	socket.emit('lista mensajes', mensajes);
};

const guardarMensaje = async (nuevoMensaje) => {
	nuevoMensaje.fecha = new Date().toLocaleString();
	await contenedorMensajes.save(nuevoMensaje);
	const mensajes = await contenedorMensajes.getAll();
	io.sockets.emit('lista mensajes', mensajes);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* sockets
io.on('connection', (socket) => {
	enviarProductosSocket(socket);
	enviarMensajesSocket(socket);

	socket.on('nuevo producto', (newProduct) => {
		guardarProducto(newProduct);
	});
	socket.on('nuevo mensaje', (newMensaje) => {
		guardarMensaje(newMensaje);
	});
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
