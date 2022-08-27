const express = require('express');
const { Router } = express;

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js');

//--------------------------------------------
// instancio servidor y persistencia

const app = express();

const productosApi = new ContenedorArchivo('dbProductos.json');
const carritosApi = new ContenedorArchivo('dbCarritos.json');

//--------------------------------------------
// permisos de administrador

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error;
};

//middleware Admin

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url,req.method));
    } else {
        next();
    }
};

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

//servicios producto

productosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await productosApi.getById(id));
});

productosRouter.get('/', async (req, res) => {
    res.json(await productosApi.getAll());
});

productosRouter.post('/', soloAdmins, async (req, res) => {
    const body = req.body;
    const producto = await productosApi.saveProduct(body);
    res.json(producto);
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const productoActualizado = await productosApi.updateProduct(body, id);
    res.send(productoActualizado);
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    res.send(await productosApi.deleteById(id));
});



//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router();

//servicios carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosApi.getById(id);
    if (carrito != null) {
        res.json(carrito.productos);
    } else {
        res.json({ error: "carrito no encontrado" });
    }

});

carritosRouter.post('/', async (req, res) => {
    const body = {};
    const carrito = await carritosApi.crearCarrito(body);
    res.json(carrito);
});

carritosRouter.post('/:id_carrito/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id_carrito;
    const idProd = req.params.id_prod;
    const producto = await productosApi.getById(idProd);
    const carrito = await carritosApi.getById(idCarrito);
    if (carrito != null) {
        if (producto != null) {
            await carritosApi.insertarProdEnCarrito(producto, idCarrito);
            res.json({ result: "producto añadido al carrito" });
        } else {
            res.json({ error: "producto no encontrado" });
        }
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});

carritosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosApi.getById(id);
    if (carrito != null) {
        await carritosApi.deleteById(id);
        res.json({ result: "carrito eliminado" });
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});

carritosRouter.delete('/:id_carrito/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id_carrito;
    const idProd = req.params.id_prod;
    const producto = await productosApi.getById(idProd);
    const carrito = await carritosApi.getById(idCarrito);
    if (carrito != null) {
        if (producto != null) {
            await carritosApi.borrarProdDeCarrito(idProd, idCarrito);
            res.json({ result: "producto borrado del carrito" });
        } else {
            res.json({ error: "producto no encontrado" });
        }
    } else {
        res.json({ error: "carrito no encontrado" });
    }
});


//--------------------------------------------
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


module.exports = app;