import { CarritoDAO } from "./daos/CarritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";
import { CuponDAO } from "./daos/CuponDAO.js";

let carritoDAO = new CarritoDAO();
let productoDAO = new ProductoDAO();
let cuponDAO = new CuponDAO();
let cupon = null;

document.addEventListener("DOMContentLoaded", function() {
    if (carritoDAO.items.length == 0) { return; } else {
        productoDAO.fetchAll().then(() => {
            loadListaDeProductos();
        });
    }

    let cuponAplicarButton = document.getElementById("cupon-aplicar");
    cuponAplicarButton.onclick = () => {
        canjearCupon();
    };

    let pagoTarjetaButton = document.getElementById("opcion-pago-tarjeta");
    pagoTarjetaButton.onclick = () => {        
        if(isFormValid()) {
            openNiubiz();
        }
    };

    document.getElementById("notificar-plin").onclick = notificarPago;
    document.getElementById("notificar-yape").onclick = notificarPago;
    document.getElementById("notificar-niubiz").onclick = () => {
        alert("el pago se ha realizado correctamente. Código de pedido: PERU2022000002");
    };
});

// Carga de productos

function loadListaDeProductos() {
    let subtotal = 0;
    let descuento = 0;
    let shoppingCartList = document.getElementById("list-products");
    let html = "";
    for(let item of carritoDAO.items) {
        let producto = productoDAO.localFetchById(item.id);
        subtotal += producto.precio * item.cantidad;
        html += item.getHTML(producto);
    }
    shoppingCartList.innerHTML = html;

    let reduceButtons = document.getElementsByClassName("reducir-carrito");
    let aumentarButtons = document.getElementsByClassName("aumentar-carrito");
    let eliminarButtons = document.getElementsByClassName("eliminar-carrito");

    for (let i = 0; i < reduceButtons.length; i++) {
        reduceButtons[i].onclick = (e) => reducirCarrito(e);
        aumentarButtons[i].onclick = (e) => aumentarCarrito(e);
        eliminarButtons[i].onclick = (e) => eliminarCarrito(e);
    }

    // descuento de entrega entrega-precio
    let entrega = 15;
    if(subtotal >= 199) {
        entrega = 0;
        document.getElementById("entrega-precio").innerHTML = `S/.0`;
    } else {
        document.getElementById("entrega-precio").innerHTML = `S/.15`;
    }

    if(cupon !== null) {
        if(cupon.tipo == "descuento") {
            descuento = cupon.descuento;
        } else if(cupon.tipo == "porcentaje") {
            descuento =  subtotal * (cupon.descuento / 100);
        }
        document.getElementById("cupon-descuento").innerHTML = `-S/.${descuento.toFixed(2)}`;
    }

    // datos del pago
    document.getElementById("subtotal").innerHTML = `S/.${subtotal.toFixed(2)}`;
    let totalTexto = `S/.${(subtotal + entrega - descuento).toFixed(2)}`;
    document.getElementById("total").innerHTML = totalTexto;
    document.getElementById("totalYape").innerHTML = totalTexto;
    document.getElementById("totalPlin").innerHTML = totalTexto;
    document.getElementById("total-modal").innerHTML = totalTexto;
    document.getElementById("item-count").innerHTML = carritoDAO.items.length;
}

// Eventos

function notificarPago() {
    alert("El pago se ha notificado");
}

function reducirCarrito(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    carritoDAO.reduceItem(productoId);
    loadListaDeProductos();
}

function aumentarCarrito(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    carritoDAO.addItem(productoId);
    loadListaDeProductos();
}

function eliminarCarrito(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    carritoDAO.deleteItemById(productoId);
    loadListaDeProductos();
}

async function canjearCupon() {
    if(cupon !== null) {
        alert("Solo puede aplicar un cupón por compra");
        return;
    }

    let cuponCodigo = document.getElementById("cupon-codigo").value;

    if(cuponCodigo.trim().length > 0){
        let cuponObtenido = await cuponDAO.findByCodigo(cuponCodigo);
        if (cuponObtenido !== undefined) {
            cupon = cuponObtenido;
            loadListaDeProductos();

            // cierra modal
            var myModalEl = document.getElementById('exampleModal');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();

            document.getElementById("cupon-row").style = "display:flex";
            document.getElementById("cupon-detalle").innerHTML = (cupon.tipo == "descuento") ? `(descuento al subtotal)` : `(${cupon.descuento}% del subtotal)`;
        } else {
            alert("El cupón no existe o ya ha vencido.");
        }
    } else {
        alert("Debe ingresar un código");
    }
}

// validación del formulario

function isFormValid() {
    let nombreCompleto = document.getElementById("nombre-completo").value.trim();
    let celular = document.getElementById("celular").value.trim();
    let distrito = document.getElementById("distrito").value;
    let direccion = document.getElementById("direccion").value.trim();

    let regexOnlyLettersWithTildeAndSpaces = /^[a-zA-ZÀ-ú\s]*$/;  
    let regexOnlyNumbers = /^[0-9]*$/;  

    if (nombreCompleto.length == 0) {
        document.getElementById("nombre-completo").focus();
        alert("Debe ingresar su nombre completo");
        return false;
    } else if (!nombreCompleto.match(regexOnlyLettersWithTildeAndSpaces)) {
        document.getElementById("nombre-completo").focus();
        alert("El nombre solo debe contener letras y espacios");
        return false;
    }

    if (celular.length == 0) {
        document.getElementById("celular").focus();
        alert("Debe ingresar su celular");
        return false;
    } else if (!celular.match(regexOnlyNumbers)) {
        document.getElementById("celular").focus();
        alert("El celular solo debe contener números");
        return false;
    }

    if (distrito == "") {
        document.getElementById("distrito").focus();
        alert("Debe seleccionar un distrito");
        return false;
    }

    if (direccion.length == 0) {
        document.getElementById("direccion").focus();
        alert("Debe ingresar una dirección");
        return false;
    }

    return true;
}

function openNiubiz() {
    const myModal = new bootstrap.Modal(document.getElementById('niubiz'), {});
    myModal.show();
}