const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.vecObj = [];
    }

    async save(objeto) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    let ultimoId = 0;
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id > ultimoId) {
                            ultimoId = this.vecObj[i].id;
                        }
                    }
                    objeto["id"] = ultimoId + 1;
                } else {
                    objeto["id"] = 1;
                }
                this.vecObj.push(objeto);
                await fs.promises.writeFile(`./${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                console.log("Escritura exitosa");

            } catch (error) {
                throw new Error('Error de escritura');
            }
            return objeto.id;
        } catch (error) {
            throw new Error('Error de lectura');
        }
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            if (contenido.length > 0) {
                this.vecObj = JSON.parse(contenido, null, '\t');
                let idEncontrado = false;
                let pos;
                for (let i = 0; i < this.vecObj.length; i++) {
                    if (this.vecObj[i].id == id) {
                        idEncontrado = true;
                        pos = i;
                    }
                }

                if (idEncontrado) {
                    return this.vecObj[pos];
                } else {
                    return null;
                }
            } else {
                console.log("Archivo vacío");
            }
        } catch (error) {
            throw new Error('Error de lectura');
        }

    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            if (contenido.length > 0) {
                this.vecObj = JSON.parse(contenido, null, '\t');
                return this.vecObj;
            } else {
                console.log("Archivo vacío");
            }
        } catch (error) {
            throw new Error('Error de lectura');
        }

    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            try {
                if (contenido.length > 0) {
                    this.vecObj = JSON.parse(contenido, null, '\t');
                    let idEncontrado = false;
                    let pos;
                    for (let i = 0; i < this.vecObj.length; i++) {
                        if (this.vecObj[i].id == id) {
                            idEncontrado = true;
                            pos = i;
                        }
                    }

                    if (idEncontrado) {
                        this.vecObj.splice(pos, 1);
                        await fs.promises.writeFile(`./${this.nombreArchivo}`, `${JSON.stringify(this.vecObj, null, '\t')}`);
                        console.log("Objeto eliminado");
                    } else {
                        console.log("id no encontrado");
                    }

                } else {
                    console.log("Archivo vacío");
                }
            } catch (error) {
                throw new Error('Error de escritura');
            }

        } catch (error) {
            throw new error('Error de lectura');
        }
    }

    async deleteAll() {
        const vecAux = await this.getAll();
        if(vecAux.length > 0){
            vecAux.length = 0;
        }
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, `${JSON.stringify(vecAux, null, '\t')}`);
            console.log('Todos los objetos fueron eliminados');
        } catch (error) {
            throw new Error('Error de escritura');
        }
    }

}

module.exports = Contenedor;
