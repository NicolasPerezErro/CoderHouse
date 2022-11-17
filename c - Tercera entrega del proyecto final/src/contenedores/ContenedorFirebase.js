import admin from "firebase-admin";
import config from '../config.js'
import logger from '../../logger/logger.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: 'https://ecommerce-e3e2f.firebaseio.com'
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
        this.nombreCol = nombreColeccion;
    }

    // PROD Y CARRITO

    async obtenerPorId(id) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let idEncontrado = false;
                let idDoc = 0;
                // busco id del documento por id
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id == id) {
                        idEncontrado = true;
                        idDoc = registros[i].idDoc;
                    }
                }

                if (idEncontrado) {
                    const doc = this.coleccion.doc(`${idDoc}`);
                    const item = await doc.get();
                    const response = item.data();
                    return response;
                } else {
                    return null;
                }
            } else {
                logger.info('vacio');
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarPorId(id) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let idEncontrado = false;
                let idDoc = 0;
                // busco id del documento por id
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id == id) {
                        idEncontrado = true;
                        idDoc = registros[i].idDoc;
                    }
                }

                if (idEncontrado) {
                    const doc = this.coleccion.doc(`${idDoc}`);
                    await doc.delete();
                    logger.info("Registro borrado");
                } else {
                    logger.info('no se encuentra');
                }

            } else {
                logger.info('vacio');
            }
        } catch (error) {
            logger.error(error);
        }
    }

    // PROD

    async obtenerTodo() {
        try {
            if (this.nombreCol == 'productos') {
                return await this.obtenerTodosProductos();
            } else {
                return await this.obtenerTodosCarritos();
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async guardarProducto(objeto) {
        try {
            const registros = await this.obtenerTodo();
            let ultimoIdDocum = 0;
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }

                    if (parseInt(registros[i].idDoc) > ultimoIdDocum) {
                        ultimoIdDocum = parseInt(registros[i].idDoc);
                    }
                }
                objeto["id"] = (ultimoId + 1);
            } else {
                objeto["id"] = 1;
                ultimoIdDocum = '1';
            }
            objeto.timestamp = Date.now();
            ultimoIdDocum = ultimoIdDocum + 1;
            let doc = this.coleccion.doc(`${ultimoIdDocum}`);
            await doc.create(objeto);
        } catch (error) {
            logger.error(error);
        }
    }

    async actualizarProducto(elem, id) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let idEncontrado = false;
                let idDoc = 0;
                // busco id del documento por id del producto
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id == id) {
                        idEncontrado = true;
                        idDoc = registros[i].idDoc;
                    }
                }

                if (idEncontrado) {
                    const doc = this.coleccion.doc(`${idDoc}`);
                    await doc.update({
                        title: elem.title,
                        description: elem.description,
                        code: elem.code,
                        thumbnail: elem.thumbnail,
                        price: elem.price,
                        stock: elem.stock
                    })

                } else {
                    logger.info('no se encuentra');
                }

            } else {
                logger.info("no hay productos");
            }
        } catch (error) {
            logger.error(error);
        }
    }

    // CARRITO


    async crearCarrito(objeto) {
        try {
            const registros = await this.obtenerTodo();
            let ultimoIdDocum = 0;
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }

                    if (parseInt(registros[i].idDoc) > ultimoIdDocum) {
                        ultimoIdDocum = parseInt(registros[i].idDoc);
                    }
                }
                objeto["id"] = (ultimoId + 1);
            } else {
                objeto["id"] = 1;
                ultimoIdDocum = '1';
            }
            objeto.timestamp = Date.now();
            objeto.productos = [];
            ultimoIdDocum = ultimoIdDocum + 1;
            let doc = this.coleccion.doc(`${ultimoIdDocum}`);
            await doc.create(objeto);
        } catch (error) {
            logger.error(error);
        }
    }

    async insertarProdEnCarrito(objeto, idCarrito) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let idEncontrado = false;
                let idDoc = 0;
                let pos = 0;
                // busco id del documento por id del carrito
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id == idCarrito) {
                        idEncontrado = true;
                        idDoc = registros[i].idDoc;
                        pos = i;
                    }
                }

                if (idEncontrado) {
                    const doc = this.coleccion.doc(`${idDoc}`);
                    const item = await doc.get();
                    const response = item.data();
                    let prodNuevo = [];
                    response.productos.push(objeto);
                    prodNuevo = response.productos;

                    await doc.update({
                        productos: prodNuevo
                    })

                } else {
                    logger.info('no se encuentra');
                }


            } else {
                logger.info("no hay carrito");
            }

        } catch (error) {
            logger.error(error);
        }

    }

    async borrarProdDeCarrito(idProducto, idCarrito) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let idEncontrado = false;
                let idProdEncontrado = false;
                let idDoc = 0;
                let posCarrito = 0;
                let posProducto = 0;
                // busco id del documento por id del carrito
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id == idCarrito) {
                        idEncontrado = true;
                        idDoc = registros[i].idDoc;
                        posCarrito = i;
                    }
                }

                if (idEncontrado) {
                    const doc = this.coleccion.doc(`${idDoc}`);
                    const item = await doc.get();
                    const response = item.data();
                    let productos = response.productos;
                    // busco id del producto
                    for (let i = 0; i < productos.length; i++) {
                        if (productos[i].id == idProducto) {
                            idProdEncontrado = true;
                            posProducto = i;
                        }
                    }

                    if (idProdEncontrado) {
                        productos.splice(posProducto, 1);
                        await doc.update({
                            productos: productos
                        })
                        logger.info('producto borrado')
                    } else {
                        logger.info('producto no encontrado en el carrito');
                    }


                } else {
                    logger.info('no se encuentra');
                }


            } else {
                logger.info("no hay carrito");
            }

        } catch (error) {
            logger.error(error);
        }
    }


    //--------------------------------------------------------------//

    async obtenerTodosProductos() {
        const querySnapshot = await this.coleccion.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            idDoc: doc.id,
            id: doc.data().id,
            title: doc.data().title,
            price: doc.data().price,
            description: doc.data().description,
            code: doc.data().code,
            thumbnail: doc.data().thumbnail,
            stock: doc.data().stock,
            timestamp: doc.data().timestamp
        }));
        return response;
    }

    async obtenerTodosCarritos() {
        const querySnapshot = await this.coleccion.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            idDoc: doc.id,
            id: doc.data().id,
            timestamp: doc.data().timestamp,
            productos: doc.data().productos
        }));
        return response;
    }
}



export default ContenedorFirebase;