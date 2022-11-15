import { CarritoItem } from "../entidades/CarritoItem.js";
import { LocalStorageDAO } from "./LocalStorageDAO.js";

export class CarritoDAO extends LocalStorageDAO {
    constructor() {
        super("CARRITO", CarritoItem);
    }

    addItem(id) {
        if (this.existsByItemId(id)) {
            let index = this.items.findIndex(item => item.id == id);
            this.items[index].cantidad += 1;
        } else {
            this.items.push(new CarritoItem(id, 1));
        }
        this.save();
    }

    removeItem(id) {
        if (this.existsByItemId(id)) {
            let index = this.items.findIndex(item => item.id == id);
            this.items[index].cantidad -= 1;
            this.save();
        }
    }
}