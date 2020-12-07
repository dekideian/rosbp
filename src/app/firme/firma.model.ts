import { IFirma } from './ifirma.model';

export class Firma implements IFirma {
    uid: string;
    nume: string;
    codFirma: string;
    angajatFirma: string;
    angajatRos: string;
}