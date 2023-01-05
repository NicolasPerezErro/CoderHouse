import ContenedorFirebase from "../../repositories/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoFirebase