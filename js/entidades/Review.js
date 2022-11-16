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
        <div class="card">
        <div class="card-header">
        ${this.nombre} (${this.fecha})
        </div>
        <div class="card-body">
            <h5 class="card-title">Puntuación: ${this.puntos}/5</h5>
            <p class="card-text">${this.comentario}</p>
        </div>
        </div>
        `;
    }
}