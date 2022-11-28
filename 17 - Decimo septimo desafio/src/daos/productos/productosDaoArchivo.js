import ContenedorArchivo from "../../repositories/ConenedorArchivo.js"

let instance = null;

class productosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.json') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new productosDaoArchivo();
        }
        return instance;
    }
}

export default productosDaoArchivo
