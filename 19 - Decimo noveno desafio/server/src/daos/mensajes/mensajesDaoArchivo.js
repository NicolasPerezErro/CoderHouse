import ContenedorArchivo from "../../repositories/ConenedorArchivo.js"

let instance = null;

class mensajesDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('mensajes.json') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new mensajesDaoArchivo();
        }
        return instance;
    }
}

export default mensajesDaoArchivo
