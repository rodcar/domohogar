export class CarritoItem {
    constructor(id, cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }

    getHTML(producto) {
        return `
            <li class="list-group-item">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-2 d-flex align-items-center justify-content-center">
                        <img src="${producto.images[0]}" alt="item" width="100" class="rounded">
                    </div>
                    <div class="col-sm-3 d-flex align-items-center justify-content-center">
                        <div class="container text-center">
                                <p class="mb-0">${producto.nombre}</p>
                                <p class="fw-bold">${producto.marca}</p> 
                        </div>
                    </div>
                    <div class="col-sm-3 d-flex align-items-center justify-content-center">
                        <div class="container text-center">
                                <p class="mb-0">S/.${producto.precio}</p>
                        </div>
                    </div>                                
                    <div class="col-sm-2 d-flex align-items-center justify-content-center">
                        <input type="button" value="-" class="reducir-carrito button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity" data-producto-id="${producto.id}">
                        <span class="w-25 text-center">${this.cantidad}</span>
                        <input type="button" value="+" class="aumentar-carrito button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity" data-producto-id="${producto.id}">
                    </div>
                    <div class="col-sm-2 d-flex align-items-center justify-content-center"><a href="#" class="eliminar-carrito text-decoration-none" data-producto-id="${producto.id}">Eliminar</a></div>
                </div>
            </div>
            </li>
        `;
    }
}