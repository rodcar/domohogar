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
            for(let elementJson of data) {
                this.items.push(Object.assign(new this.type(), elementJson));
            }
        });
        return this.items;
    }
}