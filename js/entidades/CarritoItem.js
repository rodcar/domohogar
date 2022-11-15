export class CarritoItem {
    constructor(id, cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

    getHTML() {
        return `
            ${this.id} | ${this.cantidad}
        `;
    }
}