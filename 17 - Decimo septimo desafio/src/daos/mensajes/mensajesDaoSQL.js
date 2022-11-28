import ContenedorSQL from "../../repositories/ConenedorSQL.js"

let instance = null;

class mensajesDaoSQL extends ContenedorSQL {

    constructor() {
        super(config.mariaDb, 'mensajes') // heredo e inicializo la clase
        this.value = Math.random(100);
    }

    // SINGLETON

    printValue() { // verificamos que tenemos la misma instancia
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new mensajesDaoSQL();
        }
        return instance;
    }
}

export default mensajesDaoSQL