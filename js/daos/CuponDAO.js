import { Cupon } from '../entidades/Cupon.js';
import {JsonDAO} from './JsonDAO.js';

export class CuponDAO extends JsonDAO{
    constructor() {
        super("data/cupones.json", Cupon);
    }

    async findByCodigo(codigo) {
        let cupones = await this.fetchAll();
        return cupones.filter(function(cupon) {
            return cupon.codigo == codigo;
        })[0];
    }
}