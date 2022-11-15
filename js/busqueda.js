import { ProductoDAO } from "./daos/ProductoDAO.js";

let productoDAO = new ProductoDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    let queryStrings = new URLSearchParams(window.location.search);
    const q = queryStrings.get("q");
    
    let productos = null;

    if (q != null) {
        productos = await productoDAO.buscar(q);
    } else {
        productos = await productoDAO.fetchAll();
    }

    for(let producto of productos) {
        document.getElementById("lista-productos").innerHTML += `${producto.getCardHTML()}<br>`;
    }
}