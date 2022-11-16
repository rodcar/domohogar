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
let producto = null;

document.addEventListener("DOMContentLoaded", function() {
    loadProducto().then(()=> {
        //muestra información
        cargarImagenes();
        cargarInformacion();
        // eventos
        document.getElementById("agregar-favoritos").onclick = (e) => agregarFavoritos(e);
        document.getElementById("eliminar-favoritos").onclick = (e) => eliminarFavoritos(e);
        document.getElementById("agregar-carrito").onclick = (e) => agregarCarrito(e);
    });

    loadReviews();
});

// Carga datos del producto

function cargarImagenes() {
    let mini1 = document.getElementById("mini-1");
    let mini2 = document.getElementById("mini-2");
    let mini3 = document.getElementById("mini-3");
    mini1.src = producto.images[0];
    mini2.src = producto.images[1];
    mini3.src = producto.images[2];
}

function cargarInformacion() {
    let productoNombre = document.getElementById("producto-nombre");
    let productoPrecio = document.getElementById("producto-precio");
    let productoDescripcion = document.getElementById("producto-descripcion");
    let productoStock = document.getElementById("producto-stock");
    productoNombre.innerHTML = producto.nombre;
    productoPrecio.innerHTML = producto.precio.toFixed(2);
}

async function loadProducto() {
    await productoDAO.fetchAll();
    producto = productoDAO.localFetchById(id);

    document.title = `DomoHogar - ${producto.nombre}`;

    // muestra informacion del producto
    document.getElementById("opciones").innerHTML += producto.getHTML();

    // muestra si es favorito o no
    if(favoritoDAO.isFavorite(id)) {
        document.getElementById("opciones").innerHTML += "Es favorito";
    } else {
        document.getElementById("opciones").innerHTML += "Márcalo como favorito";
    }

    // muestra botones
    document.getElementById("opciones").innerHTML += `
    <button id="agregar-favoritos" data-producto-id="${producto.id}" data-nombre="${producto.nombre}" data-imagen="imagen.jpg">Agregar a Favoritos</button>
    <button id="eliminar-favoritos" data-producto-id="${producto.id}">Eliminar de Favoritos</button>
    `;
    
    // muestra botón de agregar a carrito
    document.getElementById("opciones").innerHTML += `
    <button id="agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
    `;

    // muestra productos relacionados
    for(let relacionadoId of producto.relacionados) {
        let productoRelacionado = productoDAO.localFetchById(relacionadoId);
        document.getElementById("relacionados").innerHTML += `<a href="producto.html?id=${relacionadoId}">${productoRelacionado.nombre}</a><br>`;
    }
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