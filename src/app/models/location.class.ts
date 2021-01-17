export class Location {
    id: string;
    name: string;
    businessId: string


    constructor (id, name, businessId) {
        this.id = id;
        this.name = name;
        this.businessId = businessId;

    }
    
    toString() {
        return this.name + ' ' + this.businessId + ' ';
    }
}