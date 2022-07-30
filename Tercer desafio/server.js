const Contenedor = require('./contenedor');
const express = require('express');

const app = express();

const numeroRandom = (length) => {
    let numeroR = Math.ceil(Math.random() * length);
    return numeroR;
};

async function main() {

    let producto1 = new Contenedor('productos.txt');
    const productosDisponibles = await producto1.getAll();
    let numeroR = 0;

    app.get('/productos', (req, res) => {
        res.send(productosDisponibles);
    });

    app.get('/productoRandom', async (req, res) => {
        numeroR = numeroRandom(productosDisponibles.length);
        const productoRandom = await producto1.getById(numeroR);
        res.send(productoRandom);
    });

    const server = app.listen(8080, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    });
};

main();




