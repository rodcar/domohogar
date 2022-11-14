import {PublicacionDAO} from './daos/PublicacionDAO.js';

document.addEventListener("DOMContentLoaded", function() {
    loadPublicaciones();
});

async function loadPublicaciones() {
    let publicacionesDao = new PublicacionDAO();
    let items = await publicacionesDao.fetchAll();

    for(let publicacion of items) {
        document.getElementById("publicaciones").innerHTML += publicacion.getHTML();
    }
}