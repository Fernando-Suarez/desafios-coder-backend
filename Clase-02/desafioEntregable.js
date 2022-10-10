class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        return console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return console.log(this.mascotas.length)
    }
    addBook(nombreLibro,autor){
        this.libros.push({nombre: nombreLibro, autor: autor});
    }
    getBookNames(){
        return this.libros.map(Element => console.log(Element.nombre))
    }
}

const nombre1 = new Usuario('fernando','suarez',[{nombre:'el señor de los anillos',autor:'tolkien'}], ['perro','tortuga']);

nombre1.addMascota('gato');
console.log(nombre1.mascotas);

nombre1.countMascotas();

nombre1.addBook('el hobbit', 'tolkien');

console.log(nombre1.libros);

nombre1.getBookNames();
