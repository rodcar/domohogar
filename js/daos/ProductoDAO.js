import {JsonDAO} from './JsonDAO.js';
import {Producto} from '../entidades/Producto.js';

export class ProductoDAO extends JsonDAO{
    constructor() {
        super("data/productos.json", Producto);   
    }

    async fetchByCategoria(categoria) {
        let productos = await this.fetchAll();
        return productos.filter(function(item) {
            return item.categoria.toUpperCase() == categoria.toUpperCase();
        });
    }

    async buscar(q) {
        let productos = await this.fetchAll();
        return productos.filter(function(item) {
            return item.categoria.toLowerCase().includes(q) || item.nombre.toLowerCase().includes(q) || item.marca.toLowerCase().includes(q);
        });
    }
}