const socket = io();

//* Funciones

const render = (data) => {
	const html = data
		.map((element, index) => {
			return `
        <div>
        <strong>${element.author}</strong>:
        <em>${element.text}</em>
        </div>`;
		})
		.join(' ');
	document.getElementById('messages').innerHTML = html;
};

const addMessage = (e) => {
	const mensaje = {
		author: document.getElementById('username').value,
		text: document.getElementById('texto').value,
	};
	socket.emit('new-message', mensaje);
	return false;
};

//* Sockets
socket.on('messages', (data) => {
	console.log(data);
});

socket.on('messages', (data) => {
	render(data);
});
