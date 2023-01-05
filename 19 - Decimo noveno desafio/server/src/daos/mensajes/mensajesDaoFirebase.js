import ContenedorFirebase from "../../repositories/ConenedorFirebase.js"

let instance = null;

class mensajesDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('mensajes') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new mensajesDaoFirebase();
        }
        return instance;
    }
}

export default mensajesDaoFirebase