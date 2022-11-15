export class CarritoItem {
    constructor(id, nombre, cantidad, img, precio, descuento, marca) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.img = img;
        this.precio = precio;
        this.descuento = descuento;
        this.marca = marca;
    }

    getHTML() {
        return `
            ${this.id} | ${this.nombre} | ${this.precio}
        `;
    }
}