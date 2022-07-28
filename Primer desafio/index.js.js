class Usuario{

    constructor(nombre,apellido,libros,mascotas){
       this.nombre = nombre;
       this.apellido = apellido;
       this.libros = libros;
       this.mascotas = mascotas;
    }

    getFullName(){
        const nombreYApellido = `${this.nombre} ${this.apellido}`; 
        return nombreYApellido;
    }

    addMascotas(nombreMascota){
        this.mascotas.push(nombreMascota);
    }
    
    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){               
        this.libros.push({nombre,autor});
    }

    getBookNames(){
        const nombres = [];
        for (let i = 0; i < this.libros.length; i++){
              nombres.push(this.libros[i].nombre);
        }
   
        return nombres;
        
    }
}

const usuario = new Usuario('Nicolas','Perez Erro',[{nombre: 'Harry Potter', autor: 'J. K. Rowling'}],['perro','tortuga']);

console.log(`Nombre y apellido: ${usuario.getFullName()}`);
usuario.addMascotas('gato');
console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);
usuario.addBook('La Isla Misteriosa','Julio Verne');
console.log(usuario.getBookNames());