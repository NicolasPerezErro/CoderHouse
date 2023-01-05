import mongoose from 'mongoose'
import config from '../config.js'
import logger from '../logger/logger.js'

// conexion a la base de datos

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    // PROD Y CARRITO

    async obtenerPorId(id) {
        try {
            const registro = await this.coleccion.find({ id: id });
            if (registro.length > 0) {
                //console.log('--Mostrando registro--');
                //console.log(registro);
                return registro;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarPorId(id) {
        try {
            const registroBuscado = await this.obtenerPorId(id);
            if (registroBuscado.length > 0) {
                await this.coleccion.deleteOne({ id: id });
                logger.info("Registro borrado")
            } else {
                logger.info("No se encuentra el resgistro")
            }
            return registroBuscado;
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarTodo() {
        try {
            await this.coleccion.deleteMany({});
            logger.info("Todos los registros fueron eliminados");
        } catch (error) {
            logger.error(error);
        }

    }

    // PROD

    async obtenerTodo() {
        try {
            const registros = await this.coleccion.find({});
            if (registros.length > 0) {
                //console.log('--Mostrando registros--');
                //console.log(registros);
            } else {
                logger.info("No hay resgistros");
            }
            return registros;
        } catch (error) {
            logger.error(error);
        }
    }

    async guardarProducto(objeto) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }
                }
                objeto["id"] = (ultimoId + 1);
                logger.info(ultimoId + 1);
            } else {
                objeto["id"] = 1;
            }
            objeto.timestamp = Date.now();
            await this.coleccion.collection.insertOne(objeto);
            logger.info("Producto guardado");
        } catch (error) {
            logger.error(error);
        }
    }

    async actualizarProducto(elem, id) {
        try {
            const registroBuscado = await this.obtenerPorId(id);
            if (registroBuscado.length > 0) {
                await this.coleccion.updateOne({ id: id }, {
                    $set: {
                        title: elem.title,
                        description: elem.description,
                        code: elem.code,
                        thumbnail: elem.thumbnail,
                        price: elem.price,
                        stock: elem.stock
                    }
                });
                logger.info("Producto actualizado");
            } else {
                logger.info("Producto no encontrado");
            }
        } catch (error) {
            logger.error(error);
        }
    }

    // CARRITO

    async crearCarrito(objeto) {
        try {
            const registros = await this.obtenerTodo();
            if (registros.length > 0) {
                let ultimoId = 0;
                for (let i = 0; i < registros.length; i++) {
                    if (registros[i].id > ultimoId) {
                        ultimoId = registros[i].id;
                    }
                }
                objeto["id"] = (ultimoId + 1);
                logger.info(ultimoId + 1);
            } else {
                objeto["id"] = 1;
            }
            objeto.timestamp = Date.now();
            objeto.productos = [];
            await this.coleccion.collection.insertOne(objeto);
        } catch (error) {
            logger.error(error);
        }
    }

    async insertarProdEnCarrito(objeto, idCarrito) {
        try {
            const carritos = await this.obtenerTodo();
            if (carritos.length > 0) {
                let idEncontrado = false;
                let pos;

                //busco pos del carrito
                for (let i = 0; i < carritos.length; i++) {
                    if (carritos[i].id == idCarrito) {
                        idEncontrado = true;
                        pos = i;
                    }
                }

                if (idEncontrado) {
                    let prodNuevo = [];
                    carritos[pos].productos.push(objeto);
                    prodNuevo = carritos[pos].productos;
                    await this.coleccion.updateOne({ id: idCarrito }, {
                        $set: {
                            productos: prodNuevo
                        }
                    });
                    logger.info('Producto insertado en el carrito')
                } else {
                    logger.info('carrito no encontrado');
                }
            } else {
                logger.info("Carrito no encontrado")
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async borrarProdDeCarrito(idProducto, idCarrito) {
        try {
            const carritos = await this.obtenerTodo();
            if (carritos.length > 0) {
                let idCarritoEncontrado = false;
                let idProductoEncontrado = false;
                let posProd = 0;
                let posCarrito = 0;
                let j = 0;

                //busco pos del carrito
                for (let i = 0; i < carritos.length; i++) {
                    if (carritos[i].id == idCarrito) {
                        idCarritoEncontrado = true;
                        posCarrito = i;
                    }
                }

                //busco pos del producto
                await carritos[posCarrito].productos.forEach(element => {
                    if (element.id == idProducto) {
                        idProductoEncontrado = true;
                        posProd = j;
                    }
                    j++;
                });

                if (idCarritoEncontrado && idProductoEncontrado) {
                    let prodNuevo = [];
                    carritos[posCarrito].productos.splice(posProd, 1);
                    prodNuevo = carritos[posCarrito].productos;
                    await this.coleccion.updateOne({ id: idCarrito }, {
                        $set: {
                            productos: prodNuevo
                        }
                    });


                    logger.info("producto eliminado del carrito");
                } else {
                    logger.info("ids no encontrados");
                }

            } else {
                logger.info("Archivo vacío");
            }


        } catch (error) {
            logger.error(error);
        }
    }

}


export default ContenedorMongoDb;