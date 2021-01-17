export class Client {

    id: string;
    nume: string;
    email: string;
    numeFirma: string;
    firmaUID: string;

    constructor(obj?: Partial<Client>) {    
        Object.assign(this, obj);
     }
 
    toString() {
        return this.nume + ' ' + this.email + ' ' + this.numeFirma + ' ' + this.firmaUID;
    }
}