import { Compra } from '../entidades/Compras.js';
import {JsonDAO} from './JsonDAO.js';

export class ComprasDAO extends JsonDAO{
    constructor() {
        super("data/compras.json", Compra);
    }

    async findByCodigo(codigo) {
        let compras = await this.fetchAll();
        return compras.filter(function(compra) {
            return compra.codigo == codigo;
        })[0];
    }
}