export class LocalStorageDAO {
    constructor(localStorageId, itemType) {
        this.localStorageId = localStorageId;
        this.itemType = itemType;
        this.items = [];
        this.fetchAll();
    }

    save() {
        localStorage.setItem(this.localStorageId, JSON.stringify(this.items));
    }

    fetchAll() {
        if (localStorage.getItem(this.localStorageId) === null) {
            return [];
        }

        let localStorageItems = JSON.parse(localStorage.getItem(this.localStorageId));
        for(let item of localStorageItems) {
            this.items.push(Object.assign(new this.itemType(), item));
        }
        return this.items;
    }

    push(item) {
        this.items.push(item);
        this.save();
    }

    deleteItemById(itemId){
        this.items = this.items.filter(function(item) {
            return item.id != itemId;
        });
        this.save();
    }

    existsByItemId(id){
        let index = this.items.findIndex(item => item.id == id);
        return (index != -1);
    }
}