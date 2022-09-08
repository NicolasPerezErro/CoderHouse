const express = require('express');
const { Router } = express;
const ProductosApi = require('./api/productos.js');

const productosApi = new ProductosApi();
const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

productosRouter.get('/', (req, res) => {
    res.send(productosApi.listarAll());
});

productosRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const producto = productosApi.listar(id);
    res.send(producto);
});

productosRouter.post('/', (req, res) => {
    const body = req.body;
    const producto = productosApi.guardar(body);
    res.send(producto);
});

productosRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    let productoActualizado = productosApi.actualizar(producto, id);
    res.send(productoActualizado);
});

productosRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    let productoBorrado = productosApi.borrar(id);
    res.send(productoBorrado);
});


const app = express()
app.use(express.static('public'));
app.use('/api/productos', productosRouter);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));