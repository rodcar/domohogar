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
    let entrega = 15;

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
    document.getElementById("total").innerHTML = `S/.${(subtotal + entrega - descuento).toFixed(2)}`;
    document.getElementById("item-count").innerHTML = carritoDAO.items.length;
}

// Eventos

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