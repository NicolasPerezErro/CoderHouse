import ContenedorFirebase from "../../repositories/ContenedorFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }
}

export default ProductosDaoFirebase