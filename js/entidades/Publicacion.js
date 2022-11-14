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
    
    static from(json){
        return Object.assign(new Publicacion(), json);
    }
}