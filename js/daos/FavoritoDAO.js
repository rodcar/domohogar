import { FavoritoItem } from "../entidades/FavoritoItem.js";
import { LocalStorageDAO } from "./LocalStorageDAO.js";

export class FavoritoDAO extends LocalStorageDAO {
    constructor() {
        super("FAVORITOS", FavoritoItem);
    }

    isFavorite(id) {
        return this.existsByItemId(id);
    }
}