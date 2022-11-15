const express = require('express');
const Contenedor = require('./api/contenedor.js');
const contenedor = new Contenedor('./db/productos.json');
const { Router } = express;
const routerProductos = Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

// ejs

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/pages');

//Routes

app.use('/productos', routerProductos);

//Ruta Raiz con Formulario

app.get('/', (req, res) => {
	res.render('form');
});

// GET productos

routerProductos.get('/', async (req, res) => {
	const productos = await contenedor.getAll();
	res.render('productlist', {
		products: productos,
		hayProductos: productos.length,
	});
});

// GET productos por id

routerProductos.get('/:id', async (req, res) => {
	const { id } = req.params;
	const productosId = await contenedor.getById(parseInt(id));
	if (productosId == null) {
		res.json({ error: true, msg: 'Producto no encontrado' });
	} else {
		res.json(productosId);
	}
});

//POST Agrega un producto

routerProductos.post('/', async (req, res) => {
	const { body } = req;
	await contenedor.save(body);
	res.redirect('/');
});

//PUT actualiza por id

routerProductos.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { nombre, precio, categoria, imagen } = req.body;
	const updateProducto = await contenedor.updateById(parseInt(id), {
		nombre,
		precio,
		categoria,
		imagen,
	});
	res.json({ succes: true, product: updateProducto });
});

//DELETE borrar por id

routerProductos.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const productoId = await contenedor.getById(parseInt(id));
	if (productoId !== null) {
		await contenedor.deleteById(parseInt(id));
		res.json({ succes: true, msg: 'Producto eliminado' });
	} else {
		res.json({ error: true, msg: 'Producto no encotrado' });
	}
});

// Servidor

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
