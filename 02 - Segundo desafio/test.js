const Contenedor = require('./contenedor');

async function main(){
let producto1 = new Contenedor('productos.txt');

console.log('Agregar producto nuevo');
await producto1.save({title: 'Goma', price: 130, thumbnail: 'asd'}).then(val => console.log(`id: ${val}`));

console.log('Obtener producto por id');
await producto1.getById(1).then(val => console.log(val));

console.log('Obtener todos los productos: ');
await producto1.getAll().then(val => console.log(val));

console.log('Eliminar producto por id: ');
await producto1.deleteById(3);

//console.log('Eliminar todos los productos');
//await producto1.deleteAll();
}

main();





