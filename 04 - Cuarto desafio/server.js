const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productosRoutes = require('./routes/productsRoutes.js'); // importo Routers

app.use(express.static('public'));

app.use('/api/productos', productosRoutes); //defino la ruta principal del Router

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));