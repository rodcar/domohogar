import { ProductoDAO } from "./daos/ProductoDAO.js";

let productoDAO = new ProductoDAO();
let productos = null;

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    let queryStrings = new URLSearchParams(window.location.search);
    const q = queryStrings.get("q");

    if (q != null) {
        productos = await productoDAO.buscar(q);
    } else {
        productos = await productoDAO.fetchAll();
    }

    mostrarProductos();

    // carga la opción de ordenamiento
    let ordenarSelect = document.getElementById("ordenar");
    ordenarSelect.onchange = () => {
        switch(ordenarSelect.value) {
            case "menor":
                productos.sort((a, b) => {
                    return a.precio - b.precio;
                });
                break;
            case "mayor":
                productos.sort((a, b) => {
                    return a.precio - b.precio;
                });
                productos = productos.reverse();
                break;
            case "nombre":
                productos.sort(function (a, b) {
                    if (a.nombre < b.nombre) {
                      return -1;
                    }
                    if (a.nombre > b.nombre) {
                      return 1;
                    }
                    return 0;
                  });
                break;
            case "marca":
                productos.sort(function (a, b) {
                    if (a.marca < b.marca) {
                      return -1;
                    }
                    if (a.marca > b.marca) {
                      return 1;
                    }
                    return 0;
                  });
                break;                
            default:
                break;
        }
        mostrarProductos();
    };
}

function mostrarProductos(){
    document.getElementById("lista-productos").innerHTML = "";
    for(let producto of productos) {
        document.getElementById("lista-productos").innerHTML += `${producto.getCardHTML()}<br>`;
    }
}