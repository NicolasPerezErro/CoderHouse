import { productosDao as productosApi } from "../daos/index.js";

class productosService {

    constructor() { }

    async obtenerPorId(id) {
        try {
            return await productosApi.obtenerPorId(id)
        } catch (error) {
            console.error(error);
        }
    }

    async obtenerTodo() {
        try {
            return await productosApi.obtenerTodo();
        } catch (error) {
            console.error(error);
        }
    }

    async guardarProducto(body) {
        try {
            return await productosApi.guardarProducto(body);
        } catch (error) {
            console.error(error);
        }
    }

    async actualizarProducto(body, id) {
        try {
            return await productosApi.actualizarProducto(body, id);
        } catch (error) {
            console.error(error);
        }
    }

    async borrarPorId(id) {
        try {
            return await productosApi.borrarPorId(id);
        } catch (error) {
            console.error(error);
        }
    }

}

export default productosService