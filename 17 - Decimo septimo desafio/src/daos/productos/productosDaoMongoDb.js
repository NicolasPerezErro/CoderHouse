import ContenedorMongoDB from "../../repositories/ConenedorMongoDB.js"

let instance = null;

class productosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(config.mongoDB, 'productos') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new productosDaoMongoDB();
        }
        return instance;
    }
}

export default productosDaoMongoDB