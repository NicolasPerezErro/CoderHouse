class ProductosApi {
    constructor() {
        this.productos = [];
    }

    listar(id) {
        let productoEncontrado = false;
        let pos = 0;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                productoEncontrado = true;
                pos = i;
            }
        }

        if (productoEncontrado) {
            return this.productos[pos];
        } else {
            return { error: 'producto no encontrado' };
        }
    }

    listarAll() {
        return this.productos;
    }

    guardar(prod) {
        if (this.productos.length > 0) {
            let ultimoId = 0;
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id > ultimoId) {
                    ultimoId = this.productos[i].id;
                }
            }
            prod.id = ultimoId + 1;
        } else {
            prod.id = 1;
        }
        this.productos.push(prod);
        return prod;
    }

    actualizar(prod, id) {
        if (this.productos.length > 0) {
            const productoEncontrado = this.listar(id);
            productoEncontrado.title = prod.title;
            productoEncontrado.price = prod.price;
            productoEncontrado.thumbnail = prod.thumbnail;
            console.log('producto actualizado')
        }
        else {
            return { estado: 'vacio' };
        }
    }

    borrar(id) {
        if (this.productos.length > 0) {
            let productoEncontrado = false;
            let pos = 0;
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == id) {
                    productoEncontrado = true;
                    pos = i;
                }
            }

            if (productoEncontrado) {
                this.productos.splice(pos, 1);
                return { estado: 'producto eliminado' };
            } else {
                return { estado: 'error, producto no encontrado' };
            }
        } else {
            console.log('no hay productos');
        }
    }
}

module.exports = ProductosApi;