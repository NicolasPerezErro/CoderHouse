import express from 'express';
import faker from 'faker';
import normalizr from 'normalizr';
import util from 'util'

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { config } from './config.js';

import ContenedorSQL from '../contenedores/ContenedorSQL.js';
import ContenedorArchivo from '../contenedores/ContenedorArchivo.js';

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productosApi = new ContenedorSQL(config.mariaDb, 'productos');
const mensajesApi = new ContenedorArchivo('mensajes.json');
//const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes');


// --------------------- NORMALIZACIÓN DE MENSAJES ---------------------------- 

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

async function normalizarMensajes(mensajes) {
    const normalize = normalizr.normalize;
    const schema = normalizr.schema;

    const autor = new schema.Entity('autor');
    const msg = new schema.Entity('mensaje', {
        author: autor
    });
    const posts = new schema.Entity('posts', {
        mensajes: [msg]
    });

    const normalizedMensajes = normalize(mensajes, posts);

    return normalizedMensajes;
}

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('nuevo cliente conectado');

    //cargo historial de productos y mensajes
    io.emit('productos', await productosApi.listarAll());
    io.emit('mensajes', await normalizarMensajes(await mensajesApi.listarAll()));

    //-----------------------------------------------------
    socket.on('update', async producto => {
        //guardo en base de datos mariadb
        await productosApi.guardar(producto);
        io.sockets.emit('productos', await productosApi.listarAll());
    });

    socket.on('nuevo-mensaje', async data => {
        //guardo archivo
        await mensajesApi.guardar(data);
        const mensajeNormalizado = await normalizarMensajes(await mensajesApi.listarAll());
        print(mensajeNormalizado);
        io.sockets.emit('mensajes', mensajeNormalizado);
    });
});


// SERVICIO

app.get('/api/productos-test', (req, res) => {
    const productosAlAzar = [];
    for (let i = 0; i < 5; i++) {
        productosAlAzar.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }

    res.json(productosAlAzar);
})

//--------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))