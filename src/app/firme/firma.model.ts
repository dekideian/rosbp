import { IFirma } from './ifirma.model';

export class Firma implements IFirma {
    uid: string;
    nume: string;
    sediu: string;
    regComert: string;
    nr: string;
    CUI: string;
    rep: string;
    telefon: string;
    dataPlatiiSalariului; string;
    codCaen: string;
    codFirma: string;
    angajatFirma: string;
    angajatRos: string;
}