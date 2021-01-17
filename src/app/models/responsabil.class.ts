export class Responsabil {

    id: string;
    nume: string;
    email: string;
    numeFirma: string;
    firmaUID: string;

    constructor(obj?: Partial<Responsabil>) {    
        Object.assign(this, obj);
     }
 
    toString() {
        return this.nume + ' ' + this.email + ' ' + this.numeFirma + ' ' + this.firmaUID;
    }
}