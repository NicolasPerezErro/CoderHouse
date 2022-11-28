import parseArgs from 'minimist';

const options = {
    default: { puerto: 8080, modo: 'FORK', database: 'json' },
    alias: { p: 'puerto', m: 'modo', db: 'database' }
}

const args = parseArgs(process.argv.slice(2), options);

let productosDao
let productosDao2
let mensajesDao



switch (args.db) {
    case 'json':
        const { default: productosDaoArchivo } = await import('./productos/productosDaoArchivo.js')
        const { default: mensajesDaoArchivo } = await import('./mensajes/mensajesDaoArchivo.js')

        productosDao = productosDaoArchivo.getInstance();
        productosDao2 = productosDaoArchivo.getInstance();
        //prueba de misma instancia
        console.log(productosDao.printValue(), productosDao2.printValue());
        //
        mensajesDao = mensajesDaoArchivo.getInstance();
        break;
    case 'firebase':
        const { default: productosDaoFirebase } = await import('./productos/productosDaoFirebase.js')
        const { default: mensajesDaoFirebase } = await import('./mensajes/mensajesDaoFirebase.js')

        productosDao = productosDaoFirebase.getInstance();
        mensajesDao = mensajesDaoFirebase.getInstance();
        break;
    case 'mongodb':
        const { default: productosDaoMongoDB } = await import('./productos/productosDaoMongoDB.js')
        const { default: mensajesDaoMongoDB } = await import('./mensajes/mensajesDaoMongoDB.js')

        productosDao = productosDaoMongoDB.getInstance();
        mensajesDao = mensajesDaoMongoDB.getInstance();
        break;
    case 'sql':
        const { default: productosDaoSQL } = await import('./productos/productosDaoSQL.js')
        const { default: mensajesDaoSQL } = await import('./mensajes/mensajesDaoSQL.js')

        productosDao = productosDaoSQL.getInstance();
        mensajesDao = mensajesDaoSQL.getInstance();
        break;
}

export { productosDao, mensajesDao }