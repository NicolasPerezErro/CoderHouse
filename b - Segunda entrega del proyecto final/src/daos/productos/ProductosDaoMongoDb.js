import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            title: { type: String, require: true, max: 30 },
            description: { type: String, max: 70 },
            code: { type: Number, require: true },
            thumbnail: { type: String, require: true, max: 200 },
            price: { type: Number, require: true },
            stock: { type: Number, require: true },
            id: { type: Number, require: true, unique: true },
            timestamp: { type: Date, require: true }
        })
    }
}

export default ProductosDaoMongoDb
