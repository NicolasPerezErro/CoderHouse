let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./productos/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB.js')
        const { default: CarritosDaoMongoDB } = await import('./productos/CarritosDaoMongoDB.js')

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break;
}

export { productosDao, carritosDao }