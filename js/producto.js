import { CarritoDAO } from "./daos/CarritoDAO.js";
import { FavoritoDAO } from "./daos/FavoritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";
import { ReviewDAO } from "./daos/ReviewDAO.js";
import { FavoritoItem } from "./entidades/FavoritoItem.js";

let queryStrings = new URLSearchParams(window.location.search);
const id = parseInt(queryStrings.get("id"));
let favoritoDAO = new FavoritoDAO();
let productoDAO = new ProductoDAO();
let carritoDAO = new CarritoDAO();
let reviewDAO = new ReviewDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadProducto().then(()=> {
        document.getElementById("agregar-favoritos").onclick = (e) => agregarFavoritos(e);
        document.getElementById("eliminar-favoritos").onclick = (e) => eliminarFavoritos(e);
        document.getElementById("agregar-carrito").onclick = (e) => agregarCarrito(e);
    });

    loadReviews();
});

// Carga datos del producto

async function loadProducto() {
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
    document.getElementById("opciones").innerHTML += `
    <button id="agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
    `;
}

// Carga reviews

async function loadReviews() {
    let reviewsDiv = document.getElementById("reviews");
    let reviews = await reviewDAO.fetchByProductoId(id);
    for(let review of reviews) {
        reviewsDiv.innerHTML += `${review.getHTML()}<br>`;
    }
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

function agregarCarrito(e) {
    let productoId = parseInt(e.target.getAttribute("data-producto-id"));
    carritoDAO.addItem(productoId);
    alert("Agregado!");
}