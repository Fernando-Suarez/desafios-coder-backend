// Desarrollar un servidor que permita realizar la suma entre dos números utilizando tres rutas en estos formatos (Ejemplo con números 5 y 6)
// a) Ruta get '/api/sumar/5/6
// b) Ruta get '/api/sumar?num1=5&num2=62) 
// c) Ruta get '/api/operacion/5+6
// No hace falta validar los datos a sumar, asumimos que los ingresamos correctamente.

// El servidor escuchará en el puerto 8080 y mostrará todos los mensajes de conexión/error que correspondan.


// servidor

const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT,() => {console.log(`Servidor http escuchado en el puerto http://localhost:${PORT}`)});



//