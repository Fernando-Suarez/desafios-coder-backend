// Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

// Aspectos a incluir en el entregable: 
// El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
// Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
// Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído.


const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
        
        
    }
    // Metodos


    //// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

    async save(objeto) {
        try {
            const productos = await this.getAll();
            const id =
                productos.length === 0
                    ? 1
                    : productos[productos.length - 1].id + 1;
            objeto.id = id;
            productos.push(objeto);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            const numberId = objeto.id;
            return console.log(numberId);
            
                
            } catch(error) {
            throw new Error(`No se puedo guardar el archivo`,error);
        }
    }// fin metodo save(Object)


    // // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const productos = await this.getAll();
            const productoId = productos.find(producto => producto.id === id );
            if(productoId){
                return productoId;
            }else {
                return null;
            } 
        } catch (error) {
            throw new Error ('No se puedo obtener el elemento', error);
        }
    } // Fin metodo getById(Number)


    // // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

    async getAll() {
        try {
            const info = await fs.promises.readFile(this.archivo,'utf-8');
            if(info){
                const productos = JSON.parse(info);

                return productos;
            }else {
                return [];
            }

        } catch(error) {
            throw new Error (`No se puede leer el archivo `, error );
            
        }
    } // Fin metodo getAll()

    //  // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const productoId = productos.find(producto => producto.id === id);
            const filterId = productos.filter(producto => producto != productoId);
            await fs.promises.writeFile(this.archivo,JSON.stringify(filterId,null,2))
        } catch (error) {
            throw new Error('No se pudo eliminar el elemento', error);
        }// Fin metodo deleteById(number)
    }
    // // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo,'');
            console.log('Contenido eliminado');

        } catch(error) {
            throw new Error('No se pude eliminar el contenido del archivo', error);
        }
    } // Fin metodo deleteAll()
}

// Instancia a la Clase
//const prueba = new Contenedor('./productos.txt');


// Test

//const test = async () => {
    //console.log(await prueba.getAll());
    //await prueba.save({title: 'producto', price: 1500});
    //await prueba.deleteAll();
    //console.log(await prueba.getById(2));
    //await prueba.deleteById(2);
    
//}

//test();

module.exports = Contenedor;