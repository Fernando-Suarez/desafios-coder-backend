// Realizar un programa que:
// A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
// B) Lea nuestro propio archivo de programa y lo muestre por consola.
// C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).

// Aclaración: utilizar las funciones sincrónicas de lectura y escritura de archivos del módulo fs de node.js

//Importa File System
const fs = require('fs');

// se crea un archivo y se guarda la fecha
try{
    
const fecha = Date();
fs.writeFileSync('./fyh.txt', `${fecha}`);

}catch (error){
    console.log(error);
}

// lee el archivo creado y lo muestra en consola

try {
    const data = fs.readFileSync('./fyh.txt','utf-8');
    console.log(data)
} catch (error) {
    console.log(error)
}