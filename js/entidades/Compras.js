export class Compra {
    constructor(id, codigo, comprador, carrito, descuento, subtotal, entrega, total, estado, nota) {
        this.id = id;
        this.codigo = codigo;
        this.comprador = comprador;
        this.carrito = carrito;
        this.descuento = descuento;
        this.subtotal = subtotal;
        this.entrega = entrega;
        this.total = total;
        this.estado = estado;
        this.nota = nota;
    }

    getHTML() {
        return `
            ${this.codigo} | ${this.comprador} |${this.total}
        `;
    }
}