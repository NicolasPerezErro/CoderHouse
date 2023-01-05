import { carritosDao as carritosApi } from "../daos/index.js";

class carritosService {
    constructor() { }

    async obtenerPorId(id) {
        try {
            return await carritosApi.obtenerPorId(id)
        } catch (error) {
            console.error(error);
        }
    }

    async crearCarrito(body) {
        try {
            return await carritosApi.crearCarrito(body)
        } catch (error) {
            console.error(error);
        }
    }

    async insertarProdEnCarrito(prod, idCarrito) {
        try {
            await carritosApi.insertarProdEnCarrito(prod, idCarrito);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarPorId(id) {
        try {
            await carritosApi.borrarPorId(id);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarProdDeCarrito(idProd, idCarrito) {
        try {
            await carritosApi.borrarProdDeCarrito(idProd, idCarrito);
        } catch (error) {
            console.error(error);
        }
    }

}

export default carritosService