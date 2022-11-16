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
        <div class="col">
            <div class="card h-100">
            <img src="${this.images[0]}" class="card-img-top" alt="${this.nombre}">
            <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">${this.marca}</p>
                <p class="card-text">S/.${this.precio}</p>
                <div class="d-flex justify-content-center">
                    <a href="producto.html?id=${this.id}" class="btn btn-primary">Ver detalle</a>
                </div>                
            </div>
            </div>
        </div>
        `;

        /*
        <img src="${this.images[0]}" width="100" heigth="100">
            <p>S/.${this.precio}</p>
            <p>${this.marca}</p>
            <a href="producto.html?id=${this.id}">
                ${this.nombre}
            </a>
        */
    }
}