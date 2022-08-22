const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js');

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const contMemoria = new ContenedorMemoria();
const contArchivoProductos = new ContenedorArchivo('productos.txt');
const contArchivoMensajes = new ContenedorArchivo('mensajes.txt');

//--------------------------------------------
// configuro el socket

const hoy = new Date();

const mensajes = [
    {
        email: "admin",
        fechayHora: `[${hoy.toLocaleDateString()} ${hoy.toLocaleTimeString()}]`,
        mensaje: "¡BIENVENIDO!"
    }
];

io.on('connection', async socket => {
    console.log('nuevo cliente conectado');

    //cargo historial de mensajes y productos
    socket.emit('mensajes', mensajes);
    socket.emit('productos', contMemoria.listarAll());

    socket.on('update', async producto => {
        //guardo en memoria
        const productoNuevo = contMemoria.guardar(producto);
        //guardo en archivo
        const id = await contArchivoProductos.save(producto);
        io.sockets.emit('productos', contMemoria.listarAll());
    });

    socket.on('nuevo-mensaje', data => {
        mensajes.push(data);
        //guardo en archivo
        const id = contArchivoMensajes.save(data);
        io.sockets.emit('mensajes', mensajes);
    });
});

//--------------------------------------------

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