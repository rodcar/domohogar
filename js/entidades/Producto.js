export class Producto {
    
    constructor(id, precio, nombre, stock, detalles, relacionados) {
        this.id = id;
        this.precio = precio;
        this.nombre = nombre;
        this.stock = stock;
        this.detalles = detalles;
        this.relacionados = relacionados;
    }
    
    getHTML() {
        return `
            <img src="${this.images[0]}" width="300" heigth="300">
            ${this.nombre} | ${this.precio} | Stock: ${this.stock}
        `;
    }

    getCardHTML() {
        return `
            <img src="${this.images[0]}" width="100" heigth="100">
            <a href="producto.html?id=${this.id}">
                ${this.nombre}
            </a>
        `;
    }
}