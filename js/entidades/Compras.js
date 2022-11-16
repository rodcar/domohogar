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
        <table class="table table-hover">
            <tbody>
                <tr>
                <th scope="row">Comprador</th>
                <td>${this.comprador}</td>
                </tr>
                <tr>
                <th scope="row">Estado</th>
                <td>${this.estado}</td>
                </tr>
                <tr>
                <th scope="row">Nota</th>
                <td>${this.nota}</td>
                </tr>
            </tbody>
        </table>
        `;
    }
}