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

    reduceItem(id) {
        if (this.existsByItemId(id)) {
            let index = this.items.findIndex(item => item.id == id);
            if (this.items[index].cantidad > 1) {
                this.items[index].cantidad -= 1;
            }
            this.save();
        }
    }

    getCantidad() {
        return this.items.length || 0;
    }
}