// Desarrollar un proyecto en node.js que declare un array de objetos de este tipo:

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
];

// Y obtenga la siguiente información de dicho array
// A) Los nombres de los productos en un string separados por comas. (reduce + foreach + for)
// B) El precio total (reduce + for + foreach)
// C) El precio promedio (reduce + for + foreach)
// D) El producto con menor precio (for (aux))
// E) El producto con mayor precio (for (aux))
// F) Con los datos de los puntos A al E crear un objeto y representarlo por consola
// Const resultado = {a: 100, b: res2, c:  res3….}
// (Math.trunc)
// Aclaración: todos los valores monetarios serán expresados con 2 decimales

// Variables aux
const nombres = []; 
const precio = [];

// punto A)
productos.forEach(producto => {
    
    nombres.push(producto.nombre);
});

const nombreString = nombres.join(',');


// punto B)

productos.forEach(producto => {
    precio.push(producto.precio);
})

const precioTotal = productos.reduce((contador,precioProducto) => contador + precioProducto.precio, 0);
    

console.log((precioTotal).toFixed(2));


// punto C)

const promedio = Number.parseFloat((precioTotal / precio.length).toFixed(2));

// punto D)

const min = Math.min(...precio);

// punto E)

const mayor = Math.max(...precio);

// punto F)

const objInfo = {
    a: nombreString,
    b: precioTotal,
    c: promedio,
    d: min,
    e: mayor
}

console.log(objInfo);