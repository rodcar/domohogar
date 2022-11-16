import { ProductoDAO } from "./daos/ProductoDAO.js";

let productoDAO = new ProductoDAO();
let productos = null;
let ordenar = null;
let filtroMarcas = [];
let filtroPrecios = [];

document.addEventListener("DOMContentLoaded", function() {
    loadListaDeProductos();
});

async function loadListaDeProductos() {
    let queryStrings = new URLSearchParams(window.location.search);
    const categoria = queryStrings.get("cat");

    if (categoria != null) {
        productos = await productoDAO.fetchByCategoria(categoria);
    } else {
        productos = await productoDAO.fetchAll();
    }
    
    mostrarProductos(productos);

    // carga los filtros posibles
    let marcas = [];
    for (let producto of productos) {
        marcas.push(producto.marca);
    }
    marcas = [...new Set(marcas)];

    let filtroMarcaDiv = document.getElementById("marca");
    for(let marca of marcas) {
        filtroMarcaDiv.innerHTML += `<input type="checkbox" class="filtro-marca" value="${marca}">${marca}<br> `;
    }

    // carga los checkboxes de filtro
    let filtroMarcaCheckbox = document.getElementsByClassName("filtro-marca");
    for(let filtro of filtroMarcaCheckbox) {
        filtro.onchange = () => {
            if(filtro.checked) {
                filtroMarcas.push(filtro.value);
            } else {
                filtroMarcas = filtroMarcas.filter(function(item) {
                    return item != filtro.value
                });
            }
            aplicarFiltroYOrden();
        };
    }

    // carga la opción de ordenamiento
    let ordenarSelect = document.getElementById("ordenar");
    ordenarSelect.onchange = () => {
        ordenar = ordenarSelect.value;
        aplicarFiltroYOrden();
    };
}

function mostrarProductos(productos) {
    document.getElementById("lista-productos").innerHTML = "";
    for(let producto of productos) {
        document.getElementById("lista-productos").innerHTML += `${producto.getCardHTML()}<br>`;
    }
}

function aplicarFiltroYOrden() {
    let productosFiltrados = productos;
    // filtra
    if(filtroMarcas.length > 0) {
        productosFiltrados = productosFiltrados.filter(function(p) {
            return filtroMarcas.includes(p.marca);
        });
    }

    // ordena
    switch(ordenar) {
        case "menor":
            productosFiltrados.sort((a, b) => {
                return a.precio - b.precio;
            });
            break;
        case "mayor":
            productosFiltrados.sort((a, b) => {
                return a.precio - b.precio;
            });
            productosFiltrados = productosFiltrados.reverse();
            break;
        case "nombre":
            productosFiltrados.sort(function (a, b) {
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
            productosFiltrados.sort(function (a, b) {
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
    mostrarProductos(productosFiltrados);
}