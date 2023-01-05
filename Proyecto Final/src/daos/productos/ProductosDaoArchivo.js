import ContenedorArchivo from "../../repositories/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('dbProductos.json')
    }
}

export default ProductosDaoArchivo