import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';

import __dirname from '../__dirname.js'
import config from './config.js'
import logger from '../logger/logger.js'

const app = express();

// routes

import productosRouter from '../routes/productsRoutes.js';
import carritosRouter from '../routes/carritosRoutes.js';
import webAuthRouter from '../routes/web/auth.js';
import registerWebRouter from '../routes/web/register.js'
import homeWebRouter from '../routes/web/home.js'

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

app.use('/', webAuthRouter, registerWebRouter, homeWebRouter);
app.use('/api/productos', productosRouter);
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