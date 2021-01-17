export class Candidat {

    id: string;
    actIdentitate: string;
    angajatorNexus: string;
    anulCurent: string;
    apartament: string;
    bancaAngajator: string;
    bloc: string;
    cnp: string;
    codCOR: string;
    codFirma: string;
    cuiAngajator: string;
    cuiLocDeMunca: string;
    dataAngajare: string;
    dataAngajareNedeterminat: string;
    dataContract: string;
    dataEliberareCI: string;
    dataExpirareCI: string;
    dataInceputCimDeterminat: string;
    dataSfarsitCimDeterminat: string;
    departament: string;
    durataConcediuDeOdihna: string;
    etaj: string;
    functia: string;
    functiaDeBaza: string;
    functieDeConducere: string;
    iban: string;
    judet: string;
    locDeMunca: string;
    localitate: string;
    locatiePlata: string;
    mail: string;
    marca: string;
    normaIntreagaDeLucruOreSapt: string;
    normaIntreagaDeLucruOreZi: string;
    normaPartiala: string;
    nrContract: string;
    nrFirma: string;
    nrInregCerereDeAngajare: string;
    nrInregDeclLuareLaCunostintaROI: string;
    nrInregDeclaratieCasaDeSanatate: string;
    nrInregDeclaratieFunctieDeBaza: string;
    nrInregDeclaratiePersoaneInIntretinere: string;
    nrInregPlanificareaZilelorDeCO: string;
    nrLuniSaptamaniAni: string;
    nrZileCOConveniteInAnulCurent: string;
    numar: string;
    numarCI: string;
    numeFirma: string;
    numeSalariat: string;
    parolaWeb: string;
    perioadaDePreavizInCazulConcedierii: string;
    perioadaDePreavizInCazulDemisiei: string;
    perioadaDeProba: string;
    platitorDeImpozit: string;
    prenumeSalariat: string;
    regComertFirma: string;
    repFirma: string;
    repartizareProgramPtNormaPartiala: string;
    repartizareTimpMunca: string;
    sablonContractNexus: string;
    salariuDeBazaBrut: string;
    scara: string;
    sediuFirma: string;
    serieCI: string;
    strada: string;
    studiiSCED: string;
    tara: string;
    telefonFirma: string;
    ticheteDeMasa: string;
    tipContract: string;
    tipIntervalRepartizare: string;
    unitateaCareAEliberatCI: string;
    
    constructor(obj?: Partial<Candidat>) {    
        Object.assign(this, obj);
     }
 
    toString() {
        return this.numeFirma + ' ' + this.numeSalariat;
    }
}