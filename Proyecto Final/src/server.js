import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import config from './config.js'
import logger from './logger/logger.js'

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const __dirname = process.cwd();

// routes

import { productsRouter, carritosRouter, homeRouter, authRouter, registerRouter } from './routes.js'

// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('.hbs', handlebars({
    extname: '.hbs', defaultLayout: 'main.hbs', layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

app.use(session(config.mongoRemote))

app.use('/', authRouter, registerRouter, homeRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carritos', carritosRouter);

app.use("*", (req, res) => {
    logger.warn(`ruta ${req.url} metodo ${req.method} no implementada`)
    res.send(
        {
            error: -2,
            descripcion: `ruta ${req.url} metodo ${req.method} no implementada`
        }
    )

});


export default app;