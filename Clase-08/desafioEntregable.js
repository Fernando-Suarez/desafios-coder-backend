// Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

// Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
// Para el caso de que un producto no exista, se devolverá el objeto:
// { error : 'producto no encontrado' }
// Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria. (guardar en un array en memoria  o fs).
// Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
// Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.


//Servidor

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//Router 
const {Router} = express;
const routerProductos = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

app.listen(PORT, () => {console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`)});

//Routes

app.use('/api/productos', routerProductos);

//Instancia a la clase contenedor y constante productos

const Contenedor = require('./contenedor.js');
const contenedor = new Contenedor('./productos.json');

//GET Ruta principal

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido</h1>');
});

// GET productos

routerProductos.get('/', async (req , res) => {
    const productos = await contenedor.getAll();
    res.json(productos);
})

// GET productos por id

routerProductos.get('/:id', async (req , res) => {
    const { id } = req.params;
    const productosId = await contenedor.getById(parseInt(id));
    if(productosId == null){
        res.json({error: true, msg:'Producto no encontrado'})
    } else {
    res.json(productosId);
     
    }
})

//POST Agrega un producto

routerProductos.post('/', async (req , res) => {
    const { body } = req;
    const saveProduct = await contenedor.save(body);
    res.json({succes: true, product: saveProduct});
})

//PUT actualiza por id

routerProductos.put('/:id', async (req , res) => {
    const { id } = req.params;
    const { nombre, precio, categoria, imagen } = req.body;
    const updateProducto = await contenedor.updateById(parseInt(id),{nombre,precio,categoria,imagen});
    res.json({succes:true, product:updateProducto});
})

//DELETE borrar por id

routerProductos.delete('/:id', async (req , res) => {
    const { id } = req.params;
    const productoId = await contenedor.getById(parseInt(id));
    if(productoId !== null){
        await contenedor.deleteById(parseInt(id));
        res.json({succes: true, msg: 'Producto eliminado'});        
    } else {
        res.json({error: true, msg: 'Producto no encotrado'});
    }
}) 