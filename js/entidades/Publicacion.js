export class Publicacion {
    
    constructor(id, titulo, imagenPrincipalURL, fechaDePublicacion, autor, instagram, contenido) {
        this.id = id;
        this.titulo = titulo;
        this.imagenPrincipalURL = imagenPrincipalURL;
        this.fechaDePublicacion = fechaDePublicacion;
        this.autor = autor;
        this.instagram = instagram;
        this.contenido = contenido;
    }
    
    getHTML() {
        return `
        <div class="card mb-4">
            <img class="card-img-top" src="${this.imagenPrincipalURL}" alt="Card image cap">
            <div class="card-body">
                <h3>${this.titulo}</h3>
                <small>${this.fechaDePublicacion}</small>
                <p><b>${this.autor}</b> (@${this.instagram})</p>
                <p class="card-text">${this.contenido}</p>
            </div>
        </div>
        `;
    }
}