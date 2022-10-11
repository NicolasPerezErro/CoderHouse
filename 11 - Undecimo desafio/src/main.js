import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';

import passport from 'passport';

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { config } from './config.js';

import { conectarDB } from './controllersdb.js';

import { normalizarMensajes } from './normalizacion/index.js'

// ruta raiz

import __dirname from '../__dirname.js'

// contenedores

import ContenedorSQL from '../contenedores/ContenedorSQL.js';
import ContenedorArchivo from '../contenedores/ContenedorArchivo.js';

// routes

import productosApiRouter from './routers/api/productos.js';
import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import registerWebRouter from './routers/web/register.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productosApi = new ContenedorSQL(config.mariaDb, 'productos');
const mensajesApi = new ContenedorArchivo('mensajes.json');

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

app.use('/api/', productosApiRouter)
app.use('/', authWebRouter, homeWebRouter, registerWebRouter)
app.use("*", (req, res) => {
    res.render('../views/routing-error')

});

//--------------------------------------------
// inicio el servidor

conectarDB(config.mongodb.cnxStr, err => {

    if (err) return console.log('error en conexión de base de datos', err);
    console.log('BASE DE DATOS CONECTADA');

    app.listen(8080, (err) => {
        if (err) return console.log('error en listen server', err);
        console.log(`Server running on port 8080`);
    });
});