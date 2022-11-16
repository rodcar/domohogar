import { CarritoDAO } from "./daos/CarritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";

let carritoDAO = new CarritoDAO();
let productoDAO = new ProductoDAO();
let entrega = 15;

document.addEventListener("DOMContentLoaded", function() {
    if (carritoDAO.items.length == 0) { return; } else {
        productoDAO.fetchAll().then(() => {
            loadListaDeProductos();
        });
    }
});

// Carga de productos

function loadListaDeProductos() {
    let subtotal = 0;
    let shoppingCartList = document.getElementById("list-products");
    let html = "";
    for(let item of carritoDAO.items) {
        let producto = productoDAO.localFetchById(item.id);
        console.log(producto.precio * item.cantidad);
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

    // datos del pago
    document.getElementById("subtotal").innerHTML = `S/.${subtotal.toFixed(2)}`;
    document.getElementById("total").innerHTML = `S/.${(subtotal + entrega).toFixed(2)}`;
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