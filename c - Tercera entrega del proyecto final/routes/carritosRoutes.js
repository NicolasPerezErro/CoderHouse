import express from 'express';

import { webAuth } from '../src/auth/index.js'

const { Router } = express;

const carritosRouter = new Router();

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from '../src/daos/index.js'

//middleware application webAuth

carritosRouter.use(webAuth);

//SERVICIOS

carritosRouter.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosApi.obtenerPorId(id);
    if (carrito != null) {
        res.json(carrito.productos);
    } else {
        res.json({ error: "carrito no encontrado" });
    }

});

carritosRouter.post('/', async (req, res) => {
    const body = {};
    const carrito = await carritosApi.crearCarrito(body);
    res.json(carrito);
});

carritosRouter.post('/:id_carrito/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id_carrito;
    const idProd = req.params.id_prod;
    const producto = await productosApi.obtenerPorId(idProd);
    const carrito = await carritosApi.obtenerPorId(idCarrito);
    if (carrito != null) {
        if (producto != null) {
            await carritosApi.insertarProdEnCarrito(producto, idCarrito);
            res.json({ result: "producto añadido al carrito" });
        } else {
            res.json({ error: "producto no encontrado" });
        }
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});

carritosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosApi.obtenerPorId(id);
    if (carrito != null) {
        await carritosApi.borrarPorId(id);
        res.json({ result: "carrito eliminado" });
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});

carritosRouter.delete('/:id_carrito/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id_carrito;
    const idProd = req.params.id_prod;
    const producto = await productosApi.obtenerPorId(idProd);
    const carrito = await carritosApi.obtenerPorId(idCarrito);
    if (carrito != null) {
        if (producto != null) {
            await carritosApi.borrarProdDeCarrito(idProd, idCarrito);
            res.json({ result: "producto borrado del carrito" });
        } else {
            res.json({ error: "producto no encontrado" });
        }
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});

export default carritosRouter;