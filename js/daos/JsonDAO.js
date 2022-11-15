 {}export class JsonDAO {
    constructor(source, type) {
        this.items = [];
        this.source = source;
        this.type = type;
    }

    async fetchAll() {
        await fetch(this.source)
        .then(response => response.json())
        .then(data => {
            for(let elementJson of data) {
                this.items.push(Object.assign(new this.type(), elementJson));
            }
        });
        return this.items;
    }

    async fectchById(id) {
        let items = await this.fetchAll();
        return items.filter(function(item) {
            return item.id == id;
        })[0] || [];
    }

    localFetchById(id) {
        return this.items.filter(function(item) {
            return item.id == id;
        })[0] || [];
    }
}