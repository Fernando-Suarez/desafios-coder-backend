//a 1) Definir la función mostrarLista que reciba un array y lo recorra mostrando todos sus items.Invocarla con datos de prueba pra verificar que funciona bien.
//a 2) Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando un array con 3 números como argumento

//b EXTRA: Definir una función anónima y enviarla a otra funcion para que esta la ejecute

// 1.
const mostrarLista = (array) => array.forEach(element => console.log(element));
mostrarLista([1,2,3,4,5,6]);

//2.
((array) => {array.forEach(element => console.log(element))})([1,2,3]);

//EXTRA

function welcome(){
    return function(name){console.log(`Bienvenido al curso de backend ${name}`)} }

welcome('eduardo');