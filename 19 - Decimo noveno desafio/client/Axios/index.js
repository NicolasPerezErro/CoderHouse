import axios from 'axios';

const host = 'http://localhost:8080';

async function leerProductos() {
    try {
        const response = await axios.get(`${host}/api/productos`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function guardarProducto(producto) {
    try {
        const response = await axios.post(`${host}/api/productos`, producto);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function modificarProducto(idProd, productoModificado) {
    try {
        const response = await axios.put(`${host}/api/productos/${idProd}`, productoModificado);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function borrarProducto(idProd) {
    try {
        const response = await axios.delete(`${host}/api/productos/${idProd}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}


leerProductos();

guardarProducto({
    title: "Fanta",
    description: "bebida",
    code: 642,
    thumbnail: "www.prueba.com",
    price: 200,
    stock: 1235678
});

modificarProducto(4, {
    title: 'coca',
    description: 'bebida (modificada)'
});

borrarProducto(4);
