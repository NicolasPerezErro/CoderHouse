import carritosService from "../services/carritoService.js";
import productosService from "../services/productoService.js";

const carrService = new carritosService();
const prodService = new productosService();

class carritosController {

    constructor() { }

    async getProductsCarritoByIdController(req, res) {
        const id = req.params.id;
        const result = await carrService.obtenerPorId(id);
        if (result != null) {
            res.json(result.productos);
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async postRootApiController(req, res) {
        const body = {};
        const result = await carrService.crearCarrito(body);
        res.json(result);
    }

    async postProductsCarritoByIdController(req, res) {
        const idCarrito = req.params.id_carrito;
        const idProd = req.params.id_prod;
        const resultProd = await prodService.obtenerPorId(idProd);
        const resultCarr = await carrService.obtenerPorId(idCarrito);
        if (resultCarr != null) {
            if (resultProd != null) {
                await carrService.insertarProdEnCarrito(resultProd, idCarrito);
                res.json({ result: "producto añadido al carrito" });
            } else {
                res.json({ error: "producto no encontrado" });
            }
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async deleteCarritoByIdController(req, res) {
        const id = req.params.id;
        const result = await carrService.obtenerPorId(id);
        if (result != null) {
            await carrService.borrarPorId(id);
            res.json({ result: "carrito eliminado" });
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async deleteProductsCarritoByIdController(req, res) {
        const idCarrito = req.params.id_carrito;
        const idProd = req.params.id_prod;
        const resultProd = await prodService.obtenerPorId(idProd);
        const resultCarr = await carrService.obtenerPorId(idCarrito);
        if (resultCarr != null) {
            if (resultProd != null) {
                await carrService.borrarProdDeCarrito(idProd, idCarrito);
                res.json({ result: "producto borrado del carrito" });
            } else {
                res.json({ error: "producto no encontrado" });
            }
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

}

export default carritosController