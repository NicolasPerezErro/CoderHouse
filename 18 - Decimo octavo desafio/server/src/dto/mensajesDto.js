export default class mensajesDto {
    constructor(datos) {
        this.inputUsername = datos.inputUsername;
        this.firstname = datos.firstname;
        this.lastname = datos.lastname;
        this.alias = datos.alias;
    }
}

export function asDtoMess(message) {
    if (Array.isArray(message))
        return message.map(m => new mensajesDto(m)) // m es la clase mensajesDto
    else
        return new mensajesDto(message)
}