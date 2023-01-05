import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            id: { type: Number, require: true, unique: true },
            timestamp: { type: Date, require: true },
            productos: { type: [String], require: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongoDb