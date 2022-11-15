import { CarritoDAO } from "./daos/CarritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";

let carritoDAO = new CarritoDAO();
let productoDAO = new ProductoDAO();

document.addEventListener("DOMContentLoaded", function() {
    productoDAO.fetchAll().then(() => {
        loadListaDeProductos();
    });
});

// Carga de productos

function loadListaDeProductos() {
    document.getElementById("lista-productos").innerHTML = "";
    for(let item of carritoDAO.items) {
        let producto = productoDAO.localFetchById(item.id);
        document.getElementById("lista-productos").innerHTML += `${item.getHTML(producto)}`;
        document.getElementById("lista-productos").innerHTML += `
        <button class="reducir-carrito" data-producto-id="${producto.id}">-</button>
        <button class="aumentar-carrito" data-producto-id="${producto.id}">+</button>
        <button class="eliminar-carrito" data-producto-id="${producto.id}">Eliminar</button>
        <br>
        `;
    }

    let reduceButtons = document.getElementsByClassName("reducir-carrito");
    let aumentarButtons = document.getElementsByClassName("aumentar-carrito");
    let eliminarButtons = document.getElementsByClassName("eliminar-carrito");

    for (let i = 0; i < reduceButtons.length; i++) {
        reduceButtons[i].onclick = (e) => reducirCarrito(e);
        aumentarButtons[i].onclick = (e) => aumentarCarrito(e);
        eliminarButtons[i].onclick = (e) => eliminarCarrito(e);
    }
    //document.getElementById("aumentar-carrito").onclick = (e) => aumentarCarrito(e);
    //document.getElementById("eliminar-carrito").onclick = (e) => EliminarCarrito(e);
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