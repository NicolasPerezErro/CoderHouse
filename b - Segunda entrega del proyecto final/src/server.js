import express from 'express';

const app = express();

// routes

import productosRouter from '../routes/productsRoutes.js';
import carritosRouter from '../routes/carritosRoutes.js';

// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

app.use("*", (req, res) => {
    res.send(
        {
            error: -2,
            descripcion: `ruta ${req.url} metodo ${req.method} no implementada`
        }
    )

});


export default app;