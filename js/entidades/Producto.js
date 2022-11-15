export class Producto {
    
    constructor(id, precio, nombre, stock, detalles) {
        this.id = id;
        this.precio = precio;
        this.nombre = nombre;
        this.stock = stock;
        this.detalles = detalles;
    }
    
    getHTML() {
        return `${this.nombre} | ${this.precio}`;
    }

    getCardHTML() {
        return `
            <a href="producto.html?id=${this.id}">
                ${this.nombre}
            </a>
        `;
    }
}