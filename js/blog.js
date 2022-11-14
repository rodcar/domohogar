import {Publicacion} from './entidades/Publicacion.js';

document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/publicaciones.json')
    .then(response => response.json())
    .then(data => {
        let publicaciones = [];
        for(let element of data) publicaciones.push(Publicacion.from(element));

        let publicacionesDiv = document.getElementById("publicaciones");
        let html = "";

        for(let publicacion of publicaciones) {
            html += `
            <div class="card mb-4">
                <img class="card-img-top" src="${publicacion.imagenPrincipalURL}" alt="Card image cap">
                <div class="card-body">
                    <h3>${publicacion.titulo}</h3>
                    <small>${publicacion.fechaDePublicacion}</small>
                    <p><b>${publicacion.autor}</b> (@${publicacion.instagram})</p>
                    <p class="card-text">${publicacion.contenido}</p>
                </div>
            </div>
            `;
        }

        publicacionesDiv.innerHTML = html;
    });
});