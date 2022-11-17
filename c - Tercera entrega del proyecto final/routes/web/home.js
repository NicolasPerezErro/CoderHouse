import { Router } from 'express'
import { webAuth } from '../../src/auth/index.js'
import logger from '../../logger/logger.js'
import enviarMail from '../../mail/enviargmail.js'

import {
    carritosDao as carritosApi
} from '../../src/daos/index.js'

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, (req, res) => {
    const usuario = req.session.user;
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    console.log(`Visitas: ${req.session.views}`)
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.render('home', { usuario })
})

homeWebRouter.post('/enviarpedido/:id_carrito', async (req, res) => {
    const idCarrito = req.params.id_carrito;
    const carrito = await carritosApi.obtenerPorId(idCarrito);
    let htmlInfo = '';
    carrito.productos.forEach((prod) => {
        htmlInfo += `\nProducto: ${prod.title}, Precio: ${prod.price}`
    })
    enviarMail(`nuevo pedido de `, `Lista de productos: ${htmlInfo}`);
    res.send('mail enviado');
})

export default homeWebRouter