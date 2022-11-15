import { FavoritoDAO } from "./daos/FavoritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";
import { FavoritoItem } from "./entidades/FavoritoItem.js";

let favoritoDAO = new FavoritoDAO();
let productoDAO = new ProductoDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadProducto().then(()=> {
        document.getElementById("agregar-favoritos").onclick = (e) => agregarFavoritos(e);
        document.getElementById("eliminar-favoritos").onclick = (e) => eliminarFavoritos(e);
    });
});

async function loadProducto() {
    let queryStrings = new URLSearchParams(window.location.search);
    const id = parseInt(queryStrings.get("id"));
    let producto = await productoDAO.fectchById(id);

    if(favoritoDAO.isFavorite(id)) {
        document.getElementById("opciones").innerHTML += "Es favorito";
    } else {
        document.getElementById("opciones").innerHTML += "Márcalo como favorito";
    }

    document.getElementById("opciones").innerHTML += producto.getHTML();
    document.getElementById("opciones").innerHTML += `
    <button id="agregar-favoritos" data-producto-id="${producto.id}" data-nombre="${producto.nombre}" data-imagen="imagen.jpg">Agregar a Favoritos</button>
    <button id="eliminar-favoritos" data-producto-id="${producto.id}">Eliminar de Favoritos</button>
    `;
}

function agregarFavoritos(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    let productoNombre = e.target.getAttribute("data-nombre");
    let productoImagenURL = e.target.getAttribute("data-imagen");
    favoritoDAO.push(new FavoritoItem(productoId, productoNombre, productoImagenURL));
    alert("Agregado!");
}

function eliminarFavoritos(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    favoritoDAO.deleteItemById(productoId);
    alert("Eliminado!");
}