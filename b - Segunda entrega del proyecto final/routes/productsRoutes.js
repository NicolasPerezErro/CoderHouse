import express from 'express';

const { Router } = express;

const productosRouter = new Router();

import {
productosDao as productosApi
} from '../src/daos/index.js'


//permisos de administrador

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error;
};

//middleware Admin

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method));
    } else {
        next();
    }
};

//SERVICIOS

productosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await productosApi.obtenerPorId(id));

});

productosRouter.get('/', async (req, res) => {
    res.json(await productosApi.obtenerTodo());
});

productosRouter.post('/', soloAdmins, async (req, res) => {
    const body = req.body;
    res.json(await productosApi.guardarProducto(body))
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    res.send(await productosApi.actualizarProducto(body, id));
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    res.json(await productosApi.borrarPorId(id));
});

export default productosRouter;