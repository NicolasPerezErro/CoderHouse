import ContenedorArchivo from "../../repositories/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('dbCarritos.json')
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoArchivo