import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import passport from 'passport';

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { normalizarMensajes } from './normalizacion/index.js'

import { config } from './config.js';

import logger from './logger/logger.js'

// ruta raiz

import __dirname from '../__dirname.js'

// routes

import {
    productsRouter, randomRouter, homeRouter, infoRouter, authRouter, registerRouter
} from './routes.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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

app.engine('.hbs', handlebars({
    extname: '.hbs', defaultLayout: 'main.hbs', layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', './views');

// passport

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------

// config del session (Mongo Atlas)

app.use(session(config.mongoRemote))

//--------------------------------------------

// config routes

app.use('/api/', productsRouter, randomRouter);
app.use('/', homeRouter, infoRouter, authRouter, registerRouter);
app.use("*", (req, res) => {
    logger.warn(`Ruta: ${req.url} y metodo: ${req.method} no implementados`);
    res.render('../views/routing-error');

});

export default app