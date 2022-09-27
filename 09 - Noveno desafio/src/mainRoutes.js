import express from 'express';
import { Server as HttpServer } from 'http';

const app = express();
const httpServer = new HttpServer(app);

//routes

import mensajesRoutes from "../routes/mensajesRoutes.js"
import productosRoutes from "../routes/productosRoutes.js"

mensajesRoutes.on;
productosRoutes.on;


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