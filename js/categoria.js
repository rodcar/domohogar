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
    const q = queryStrings.get("q");

    if (categoria != null) {
        let tituloDiv = document.getElementById("titulo");
        tituloDiv.innerHTML = categoria;
        document.title = `DomoHogar - ${categoria}`;
        productos = await productoDAO.fetchByCategoria(categoria);
    } else {
        if (q != null) {
            let tituloDiv = document.getElementById("titulo");
            tituloDiv.innerHTML = `Resultados: <span class="text-primary">${q}</span>`;
            document.title = `DomoHogar - Resultados de búsqueda`;
            productos = await productoDAO.buscar(q);
        } else {
            productos = await productoDAO.fetchAll();
        }
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
        //filtroMarcaDiv.innerHTML += `<input type="checkbox" class="filtro-marca" value="${marca}">${marca}<br> `;
        filtroMarcaDiv.innerHTML += `
        <div class="form-check">
        <input class="filtro-marca form-check-input" type="checkbox" value="${marca}">
        <label class="form-check-label" for="flexCheckDefault">${marca}</label>
        </div>
    `;
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

    let filtroPrecioCheckbox = document.getElementsByClassName("filtro-precio");
    for(let filtro2 of filtroPrecioCheckbox) {
        filtro2.onchange = () => {
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
    let productosFiltrados = [];
    
    //filtra precios
    let filtroPrecio1 = document.getElementById("filtro-precio-1").checked;
    let filtroPrecio2 = document.getElementById("filtro-precio-2").checked;
    let filtroPrecio3 = document.getElementById("filtro-precio-3").checked;
    let filtroPrecio4 = document.getElementById("filtro-precio-4").checked;
    let filtroPrecio5 = document.getElementById("filtro-precio-5").checked;
    let filtroPrecio6 = document.getElementById("filtro-precio-6").checked;

    if(filtroPrecio1 || filtroPrecio2 || filtroPrecio3 || filtroPrecio4 || filtroPrecio5 || filtroPrecio6){
        for(let p of productos) {
            if(filtroPrecio1 && (p.precio < 100)) {
                productosFiltrados.push(p);
            }
            if(filtroPrecio2 && (p.precio >= 100 && p.precio < 200)) {
                productosFiltrados.push(p);
            }
            if(filtroPrecio3 && (p.precio >= 200 && p.precio < 300)) {
                productosFiltrados.push(p);
            }
            if(filtroPrecio4 && (p.precio >= 300 && p.precio < 400)) {
                productosFiltrados.push(p);
            }
            if(filtroPrecio5 && (p.precio >= 400 && p.precio < 500)) {
                productosFiltrados.push(p);
            }
            if(filtroPrecio6 && (p.precio >= 600)) {
                productosFiltrados.push(p);
            }                      
        }
    } else {
        productosFiltrados = productos;
    }
        
    // filtra marcas
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