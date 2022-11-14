export class JsonDAO {
    constructor(source, type) {
        this.items = [];
        this.source = source;
        this.type = type;
    }

    async fetchAll() {
        await fetch(this.source)
        .then(response => response.json())
        .then(data => {
            for(let element of data) this.items.push(this.type.from(element));
        });
        return this.items;
    }
}