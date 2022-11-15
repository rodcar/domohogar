import { ComprasDAO } from './daos/ComprasDAO.js';

let comprasDao = new ComprasDAO();

document.addEventListener("DOMContentLoaded", function() {
    let buscarButton = document.getElementById("buscar-compra");

    buscarButton.onclick = () => {
        let codigo = document.getElementById("codigo").value;
        buscarCompra(codigo);
    };
});

async function buscarCompra(codigo) {
    let compra = await comprasDao.findByCodigo(codigo);
    console.log(codigo);
    console.log(compra);
    document.getElementById("info").innerHTML = compra.getHTML();
}