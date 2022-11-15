import { CarritoDAO } from "./daos/CarritoDAO.js";

let carritoDAO = new CarritoDAO();

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    for(let item of carritoDAO.items) {
        document.getElementById("lista-productos").innerHTML += item.getHTML();
    }
}