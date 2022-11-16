import { CarritoDAO } from "./daos/CarritoDAO.js";
import { FavoritoDAO } from "./daos/FavoritoDAO.js";
import { ProductoDAO } from "./daos/ProductoDAO.js";
import { ReviewDAO } from "./daos/ReviewDAO.js";
import { FavoritoItem } from "./entidades/FavoritoItem.js";

let queryStrings = new URLSearchParams(window.location.search);
const id1 = parseInt(queryStrings.get("id1"));
const id2 = parseInt(queryStrings.get("id2"));

let favoritoDAO = new FavoritoDAO();
let productoDAO = new ProductoDAO();
let carritoDAO = new CarritoDAO();
let reviewDAO = new ReviewDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadProducto();
});

// Carga datos de los productos

async function loadProducto() {
    await productoDAO.fetchAll();
    let producto1 = productoDAO.localFetchById(id1);
    let producto2 = productoDAO.localFetchById(id2);
    console.log(producto1);
    console.log(producto2);
    let productosDiv = document.getElementById("productos");
    let comparacionDiv = document.getElementById("comparacion");
    productosDiv.innerHTML += `${producto1.getCardHTML()} || ${producto2.getCardHTML()}`;

    let size = Object.keys(producto1).length;
    let size2 = Object.keys(producto2).length;
    let p = (size >= size2) ? producto1 : producto2;
    for (var key in p) {
        if (p.hasOwnProperty(key) && !["relacionados", "id", "stock", "precio", "images", "nombre"].includes(key)) {
            comparacionDiv.innerHTML += `${key}: ${producto1[key] || "-"} || ${producto2[key] || "-"}<br>`;
        }
    }
}