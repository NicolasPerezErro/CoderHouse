const express = require('express');

const { Router } = express;

const productosRouter = new Router();

const ProductosApi = require('../api/productos.js');
const productosApi = new ProductosApi();


productosRouter.get('/', (req, res) => {
    res.send(productosApi.listarAll());
});

productosRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const producto = productosApi.listar(id);
    res.send(producto);
});

productosRouter.post('/', (req, res) => {
    const body = req.body;
    const producto = productosApi.guardar(body);
    res.send(producto);
});

productosRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    let productoActualizado = productosApi.actualizar(producto, id);
    res.send(productoActualizado);
});

productosRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    let productoBorrado = productosApi.borrar(id);
    res.send(productoBorrado);
});

module.exports = productosRouter;