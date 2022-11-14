export class Producto {
    
    constructor(precio, nombre, stock, detalles) {
        this.precio = precio;
        this.nombre = nombre;
        this.stock = stock;
        this.detalles = detalles;
    }
    
    getHTML() {
        return `${this.nombre} | ${this.precio}`;
    }
}