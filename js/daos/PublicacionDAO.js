import {JsonDAO} from './JsonDAO.js';
import {Publicacion} from '../entidades/Publicacion.js';

export class PublicacionDAO extends JsonDAO{
    constructor() {
        super("data/publicaciones.json", Publicacion);   
    }
}