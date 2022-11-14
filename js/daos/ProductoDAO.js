import {JsonDAO} from './JsonDAO.js';
import {Producto} from '../entidades/Producto.js';

export class ProductoDAO extends JsonDAO{
    constructor() {
        super("data/productos.json", Producto);   
    }
}