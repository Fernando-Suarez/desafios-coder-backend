//Definir variables que almacene los siguientes datos:

let nombre = 'pepe';

let edad = 25;

let precio = '$99.90';

const seriesFavoritas = ['Dark', 'Mr Robot', 'Castlevania'];

const misPeliculasFavoritas = [{
    nombre:'El Ultimo Samurai',
    anio: 2002,
    protagonistas:'Tom Cruise'
},{
    nombre:'Lord of the rings',
    anio: 2003,
    protagonistas:'Frodo'
},{
    nombre:'9 Reinas',
    anio: 2000,
    protagonistas:'Ricardo Darin'
}]

// Mostrar todos eso valores por consola
    console.log(nombre,edad,precio);
    console.log(seriesFavoritas);
    console.table(misPeliculasFavoritas);
// Incrementar la edad en 1 y volver a mostrarla

edad++
console.log(edad);
//Agregar una serie a la lista y volver a mostrarla
seriesFavoritas.push('Los Simpsons');
console.log(seriesFavoritas);
