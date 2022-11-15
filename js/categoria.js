import { ProductoDAO } from "./daos/ProductoDAO.js";

let productoDAO = new ProductoDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    let queryStrings = new URLSearchParams(window.location.search);
    const categoria = queryStrings.get("cat");
    let productos = await productoDAO.fetchByCategoria(categoria);

    for(let producto of productos) {
        document.getElementById("lista-productos").innerHTML += producto.getHTML();
    }
}