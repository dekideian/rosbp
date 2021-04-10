export class Firma {

    id: string;
    CUI: string;
    nr: string;
    nume: string;
    regComert: string;
    rep: string;
    sediu: string;
    telefon: string;
    codCaen: string;
    dataPlatiiSalariului: string;

    constructor(obj?: Partial<Firma>) {    
        Object.assign(this, obj);
     }
 
    toString() {
        return this.CUI + ' ' + this.nr + ' '+ this.nume + ' '+ this.regComert + ' '+ this.rep + ' '+ this.sediu + ' '+ this.telefon;
    }
}