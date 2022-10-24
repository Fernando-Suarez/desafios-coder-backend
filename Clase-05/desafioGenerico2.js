// Realizar un proyecto en node.js que permita calcular cuántos años y días totales transcurrieron desde la fecha de tu nacimiento. Para ello utilizar la dependencia moment instalándola en forma local desde npm. Imprimir los resultados por consola. Hacer las modificaciones necesarias para que sólo se actualicen los patches para la librería recién instalada.

// Un ejemplo de salida:
// Hoy es 11/01/2021
// Nací el 29/11/1968
// Desde mi nacimiento han pasado 52 años.
// Desde mi nacimiento han pasado 19036 días.

// Ayuda:
// Utilizar los métodos diff y format de la librería moment.

const moment = require('moment');

let hoy = moment(new Date());



const fechaActual =() => console.log(`Hoy es ${hoy.format('DD-MM-YYYY')}`);


const fechaNacimiento = (nacimiento) =>  console.log(`Nací el ${moment(new Date(nacimiento)).format('DD-MM-YYYY')}`);

const edadActualAnios = (nacimiento) => console.log(`Desde mi nacimiento han pasado ${hoy.diff(moment(new Date(nacimiento)),'years')} años `);

const edadActualDias = (nacimiento) => console.log(`Desde mi nacimiento han pasado ${hoy.diff(moment(new Date(nacimiento)),'days')} dias`);



fechaActual();
fechaNacimiento('10-12-1999');
edadActualAnios('10-12-1999');
edadActualDias('10-12-1999');






