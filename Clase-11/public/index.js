const socket = io();
socket.on('connect', () => {
	console.log('me conecte!');
});

socket.on('msg', (data) => {
	console.log(data);
});

socket.on('msg-list', (data) => {
	console.log(data);
	let html = '';
	data.forEach((item) => {
		html += `user ${item.email} dijo ${item.mensaje} <br>`;
	});
	document.getElementById('div-list-msgs').innerHTML = html;
});

function enviarMSG() {
	const email = document.getElementById('input-email').value;
	const textoMensaje = document.getElementById('input-msg').value;
	socket.emit('msg', { email: email, mensaje: textoMensaje });
}
