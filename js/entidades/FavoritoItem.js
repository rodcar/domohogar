export class FavoritoItem {
    constructor(id, nombre, imagenURL) {
        this.id = id;
        this.nombre = nombre;
        this.imagenURL = imagenURL;
    }

    getHTML() {
        return `
            ${this.id} | ${this.nombre}
        `;
    }
}