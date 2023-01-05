import productosService from "../services/productoService.js";

const prodService = new productosService();

class productosController {

    constructor() { }

    async getProductsByIdController(req, res) {
        const id = req.params.id;
        const result = await prodService.obtenerPorId(id);
        res.json(result);
    }

    async getRootProductsController(req, res) {
        const result = await prodService.obtenerTodo();
        res.json(result);
    }

    async postRootProductsController(req, res) {
        const body = req.body;
        const result = await prodService.guardarProducto(body);
        res.json(result)
    }

    async putProductsByIdController(req, res) {
        const body = req.body;
        const id = req.params.id;
        const result = await prodService.actualizarProducto(body, id);
        res.send(result);
    }

    async deleteProductsByIdController(req, res) {
        const id = req.params.id;
        const result = await prodService.borrarPorId(id);
        res.json(result);
    }

}

export default productosController