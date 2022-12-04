export default class productosDto {
    constructor(datos) {
        this.nombre = datos.nombre;
        this.precio = datos.precio;
        this.stock = datos.stock;
    }
}

export function asDtoProd(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new productosDto(p)) // p es la clase productosDto
    else
        return new productosDto(prod)
}