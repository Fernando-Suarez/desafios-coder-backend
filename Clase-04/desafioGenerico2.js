// Realizar un programa que ejecute las siguientes tareas:
// A) Lea un archivo info.txt que contenga un objeto. Pasarlo a un objeto de javascript para poder manipularlo.
// B) Mostrar este objeto en la consola.
// C) Modificar el objeto y volver a grabar.
// D) Controlar si quedó bien grabado.
// D) Manejar errores.

// Aclaraciones:
// Trabajar con fs.promises (then/catch).

// Ayuda:
// Considerar el uso de JSON.stringify(info.contenidoObj, null,2) para preservar el formato de representación del objeto en el archivo.

const fs = require('fs');


const programa = () => {
    
    // se lee el archivo y se pasa a un objeto de javascript

    fs.promises.readFile('./info.txt','utf-8')
    .then(contenidoInfo => {
    const contenido = JSON.parse(contenidoInfo);

       // se muestra el contenido en la consola
        console.log(contenido);

        // se modifica el contenido del objeto y se vuelve a grabar
        contenido.nombre = 'juan'
        fs.promises.writeFile('./info.txt',`${JSON.stringify(contenido,null,2)}`);


        // se controla si quedo bien grabado

        console.log(contenido);
        
    }).catch(error => {
        console.log(error);
    })

}

programa();