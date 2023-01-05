import ContenedorMongoDB from "../../repositories/ConenedorMongoDB.js"

let instance = null;

class mensajesDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(config.mongoDB, 'mensajes') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new mensajesDaoMongoDB();
        }
        return instance;
    }
}

export default mensajesDaoMongoDB