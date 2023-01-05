import ContenedorFirebase from "../../repositories/ConenedorFirebase.js"

let instance = null;

class productosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new productosDaoFirebase();
        }
        return instance;
    }
}

export default productosDaoFirebase