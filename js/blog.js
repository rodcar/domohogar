import {Publicacion} from './entidades/Publicacion.js';

document.addEventListener("DOMContentLoaded", function() {
    fetch('data/publicaciones.json')
    .then(response => response.json())
    .then(data => {
        let publicaciones = [];
        for(let element of data) publicaciones.push(Publicacion.from(element));

        let publicacionesDiv = document.getElementById("publicaciones");
        let html = "";

        for(let publicacion of publicaciones) {
            html += publicacion.getHTML();
        }

        publicacionesDiv.innerHTML = html;
    });
});