import express from 'express';

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { config } from './config.js';
import ContenedorSQL from '../contenedores/ContenedorSQL.js';

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productosApi = new ContenedorSQL(config.mariaDb, 'productos');
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes');

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('nuevo cliente conectado');

    //cargo historial de productos y mensajes
    io.emit('productos',await productosApi.listarAll());
    io.emit('mensajes',await mensajesApi.listarAll());

    //-----------------------------------------------------
    socket.on('update', async producto => {
        //guardo en base de datos mariadb
        await productosApi.guardar(producto);
        io.sockets.emit('productos', await productosApi.listarAll());
    });

    socket.on('nuevo-mensaje', async data => {
        //guardo en base de datos sqlite3
        await mensajesApi.guardar(data);
        io.sockets.emit('mensajes', await mensajesApi.listarAll());
    });
});

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