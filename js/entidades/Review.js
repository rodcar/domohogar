export class Review {
    constructor(productoId, nombre, puntos, comentario, fecha) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.puntos = puntos;
        this.comentario = comentario;
        this.fecha = fecha;
    }

    getHTML() {
        return `
        ${this.nombre} (${this.fecha}): ${this.comentario}
        `;
    }
}