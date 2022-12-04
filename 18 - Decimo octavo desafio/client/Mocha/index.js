import supertest from 'supertest';
import { expect } from 'chai';

let request

describe('test api rest full', () => {

    before(async function () {
        //await connectDb();
        //server = await startServer();
        request = supertest(`http://localhost:8080`);
    });

    after(function () {
        //mongoose.disconnect();
        //server.close();
        console.log('fin');
    });

    describe('GET', () => {
        it('debería retornar una lista de productos o un array vacio', async () => {
            const response = await request.get('/api/productos');
            //console.log(response._body);
            expect(response.status).to.eq(200);
        })
    });

    describe('POST', () => {
        it('debería agregar un producto', async () => {
            const producto = {
                title: "Fanta",
                description: "bebida",
                code: 642,
                thumbnail: "www.prueba.com",
                price: 200,
                stock: 1235678
            }
            const response = await request.post('/api/productos').send(producto);
            expect(response.status).to.eq(200);
        })
    })

    describe('PUT', () => {
        it('debería modificar un producto', async () => {
            const idProducto = 4;
            const productoModificado = {
                title: 'coca',
                description: 'bebida (modificada)'
            }
            const response = await request.put(`/api/productos/${idProducto}`).send(productoModificado);
            expect(response.status).to.eq(200);
        })
    });

    describe('DELETE', () => {
        it('debería eliminar un producto', async () => {
            const idProducto = 4;
            const response = await request.delete(`/api/productos/${idProducto}`);
            expect(response.status).to.eq(200);
        })
    });
});

/*

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost/mibasetest', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos conectada!');
    } catch (error) {
        throw new Error(`Error de conexión en la base de datos: ${err}`)
    }
}

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0
        const server = app.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}
*/