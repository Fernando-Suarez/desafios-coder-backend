// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.


// Servidor
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

// Modulo de clase e instancia
const Contenedor = require('../Clase-04/desafioEntregable.js');
const contenedor = new Contenedor('./productos.txt');



app.get('/', (req,res) => {

    res.send('Bienvenido, para ver todos los productos escriba /productos, para ver un producto aleatorio escriba /productoRandom ');
})


app.get('/productos', async (req, res) => {
    
    const productos = await contenedor.getAll();
    res.json(productos);
})

app.get('/productoRandom', async (req, res) => {
        const productos = await contenedor.getAll();
        const productoRandom = await contenedor.getById(Math.floor(Math.random() * productos.length + 1)) ; 
        res.json(productoRandom);
    })


app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto http://localhost:${PORT}`)) 

