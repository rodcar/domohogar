import {Publicacion} from './entidades/Publicacion.js';
import {PublicacionDAO} from './daos/PublicacionDAO.js';

document.addEventListener("DOMContentLoaded", function() {
    loadPublicaciones();
});

async function loadPublicaciones() {
    let publicacionesDao = new PublicacionDAO();
    let items = await publicacionesDao.fetchAll();
    
    let html = "";
    for(let publicacion of items) {
        html += publicacion.getHTML();
    }

    document.getElementById("publicaciones").innerHTML = html;
}