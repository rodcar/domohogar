import { Review } from '../entidades/Review.js';
import {JsonDAO} from './JsonDAO.js';

export class ReviewDAO extends JsonDAO{
    constructor() {
        super("data/reviews.json", Review);
    }

    async fetchByProductoId(id) {
        let reviews = await this.fetchAll();
        return reviews.filter(function(review) {
            return review.productoId == id;
        });
    }
}