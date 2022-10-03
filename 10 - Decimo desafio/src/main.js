import express from 'express';
import session from 'express-session'

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { config } from './config.js';

import { normalizarMensajes } from './normalizacion/index.js'

// contenedores

import ContenedorSQL from '../contenedores/ContenedorSQL.js';
import ContenedorArchivo from '../contenedores/ContenedorArchivo.js';

// routes

import productosApiRouter from './routers/api/productos.js';
import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productosApi = new ContenedorSQL(config.mariaDb, 'productos');
const mensajesApi = new ContenedorArchivo('mensajes.json');

//--------------------------------------------
// config del session

app.use(session(config.mongoRemote))

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
        //normalizo mensaje
        const mensajeNormalizado = await normalizarMensajes(await mensajesApi.listarAll());
        io.sockets.emit('mensajes', mensajeNormalizado);
    });
});


//--------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// config routes

app.use('/api/', productosApiRouter)
app.use('/', authWebRouter, homeWebRouter)

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))