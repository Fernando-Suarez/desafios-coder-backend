//Dada la siguiente constante: const frase = 'Hola mundo cómo están'
//Realizar un servidor con API Rest usando node.js y express que contenga los siguientes endpoints get:

//1) '/api/frase' -> devuelve la frase en forma completa en un campo ‘frase’.
//2) '/api/letras/:num  -> devuelve por número de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo ‘letra’.
//3) '/api/palabras/:num  -> devuelve por número de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo ‘palabra’.


//Aclaraciones:
//- En el caso de las consignas 2) y 3), si se ingresa un parámetro no numérico o que esté fuera del rango de la cantidad total de letras o palabras (según el caso), el servidor debe devolver un objeto con la descripción de dicho error. Por ejemplo:
//{ error: "El parámetro no es un número" } cuando el parámetro no es numérico
//{ error: "El parámetro está fuera de rango" } cuando no está entre 1 y el total de letras/palabras
//- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

// servidor
const express = require('express');
const app = express();
const PORT = 8080;
app.listen(PORT,() => console.log(`Servidor Http escuchando en el puerto http://localhost:${PORT}`));


//   Constante
const frase = 'Hola mundo cómo están';


// endpoints
app.get('/api/frase', (req , res) => {
    res.json({frase});
})

app.get('/api/letras/:num', (req , res) =>{

//parametro url
    const {num} = req.params;

//* se crea un array de caracteres a partir de la constante frase

    const arrayLetras = frase.split('');

 //*se filtran los espacios y se deja solamente las letras   
    const letras = arrayLetras.filter(letra => letra !=' ');

//* se parsea el parametro de la url y se lo condiciona para que sea menor a la longitud del array de letras

    if(parseInt(num) <= letras.length){
        const letraEncontrada = letras[num - 1];
        res.json({letra: letraEncontrada});
    } else {
        res.json({error : 'El parámetro no es un número'});
    }
})

app.get('/api/palabras/:num', (req , res) => {
 
 // parametro url   
    const {num} = req.params;

 //* se crea un array de palabrasa a partir de la constante letras y se condiciona para que sea menor a la longitud del array letras

    const arrayPalabras = frase.split(' ');
    if(parseInt(num) <= arrayPalabras.length){
        const palabraEncotrada = arrayPalabras[num - 1];
        res.json({palabra: palabraEncotrada});
    } else {
        res.json({error: 'El parámetro está fuera del rango'})
    }

})
        



 
