export class CarritoItem {
    constructor(id, cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

    getHTML(producto) {
        return `
            ${producto.id} | ${producto.nombre} | ${producto.precio} | ${this.cantidad}
        `;
    }
}