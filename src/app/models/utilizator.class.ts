export class Utilizator {

    id: string;
    nume: string;
    email: string;

    constructor(obj?: Partial<Utilizator>) {    
        Object.assign(this, obj);
     }
 
    static of(nume:string, email:string): Utilizator {       
        return new Utilizator({nume: nume, email: email});     
    }
    toString() {
        return this.nume + ' ' + this.email + ' ';
    }
}