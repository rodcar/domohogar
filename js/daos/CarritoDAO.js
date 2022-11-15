import { CarritoItem } from "../entidades/CarritoItem.js";
import { LocalStorageDAO } from "./LocalStorageDAO.js";

export class CarritoDAO extends LocalStorageDAO {
    constructor() {
        super("CARRITO", CarritoItem);
    }
}