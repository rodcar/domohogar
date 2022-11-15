import { ProductoDAO } from "./daos/ProductoDAO.js";

let productoDAO = new ProductoDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    let queryStrings = new URLSearchParams(window.location.search);
    const categoria = queryStrings.get("cat");
    
    let productos = null;

    if (categoria != null) {
        productos = await productoDAO.fetchByCategoria(categoria);
    } else {
        productos = await productoDAO.fetchAll();
    }

    for(let producto of productos) {
        document.getElementById("lista-productos").innerHTML += `${producto.getCardHTML()}<br>`;
    }
}