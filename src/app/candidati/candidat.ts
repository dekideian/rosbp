// export interface ICandidat {
//     uid: string;
//     nrContract: string;
//     dataContract: string;
//     numeSalariat: string;
//     prenumeSalariat: string;
//     marca: string;
//     tara: string;
//     judet: string;
//     localitate: string;
//     strada: string;
//     numar: string;
//     bloc: string;
//     scara: string;
//     etaj: string;
//     apartament: string;
//     actIdentitate: string;
//     serieCI: string;
//     numarCI: string;
//     unitateaCareAEliberatCI: string;
//     dataEliberareCI: string;
//     dataExpirareCI: string;
//     cnp: string;
//     dataAngajare: string;
//     dataAngajareNedeterminat: string;
//     nrLuniSaptamaniAni: string;
//     dataInceputCimDeteriminat: string;
//     dataSfarsitCimDeterminat: string;
//     departament: string;
//     locDeMunca: string;
//     functia: string;
//     codCOR: string;
//     normaIntreagaDeLucruOreZi: string;
//     normaIntreagaDeLucruOreSapt: string;
//     normaPartiala: string;
//     repartizareProgramPtNormaPartiala: string;
//     repartizareTimpMunca: string;
//     tipIntervalRepartizare: string;

//     durataConcediuDeOdihna: string;
//     salariulDeBazaBrut: string;
//     perioadaDeProba: string;
//     perioadaDePreavizInCazulConcedierii: string;
//     perioadaDePreavizInCazulDemisiei: string;
//     anulCurent: string;
//     nrInregCerereDeAngajare: string;
//     nrInregDeclaratieFunctieDeBaza: string;
//     nrInregDeclaratiePersoaneInIntretinere: string;
//     nrInregDeclaratieCasaDeSanatate: string;
//     nrInregDeclLuareLaCunostintaROI: string;
//     nrInregPlanificareaZilelorDeCO: string;
//     nrZileCOConveniteInAnulCurent: string;
//     platitorDeImpozit: string;

//     functiaDeBaza: string;
//     mail: string;
//     parolaWeb: string;
//     locatiePlata: string;
//     bancaAngajator: string;
//     iban: string;
//     tipContract: string;
//     sablonContractNexus: string;
//     angajatorNexus: string;
//     cuiAngajator: string;
//     cuiLocDeMunca: string;
//     ticheteDeMasa: string;
//     studiiSCED: string;
// }

export interface ICandidatLocal {
    uid;
    nrContract: string;
    dataContract: string;
    numeSalariat: string;
    prenumeSalariat: string;
    marca: string;
    tara: string;
    judet: string;
    localitate: string;
    strada: string;
    numar: string;
    bloc: string;
    scara: string;
    etaj: string;
    apartament: string;
    actIdentitate: string;
    serieCI: string;
    numarCI: string;
    unitateaCareAEliberatCI: string;
    dataEliberareCI: string;
    dataExpirareCI: string;
    cnp: string;
    dataAngajare: string;
    dataAngajareNedeterminat: string;
    nrLuniSaptamaniAni: string;
    dataInceputCimDeteriminat: string;
    dataSfarsitCimDeterminat: string;
    departament: string;
    locDeMunca: string;
    functia: string;
    codCOR: string;
    normaIntreagaDeLucruOreZi: string;
    normaIntreagaDeLucruOreSapt: string;
    normaPartiala: string;
    repartizareProgramPtNormaPartiala: string;
    repartizareTimpMunca: string;
    tipIntervalRepartizare: string;

    durataConcediuDeOdihna: string;
    salariulDeBazaBrut: string;
    perioadaDeProba: string;
    perioadaDePreavizInCazulConcedierii: string;
    perioadaDePreavizInCazulDemisiei: string;
    anulCurent: string;
    nrInregCerereDeAngajare: string;
    nrInregDeclaratieFunctieDeBaza: string;
    nrInregDeclaratiePersoaneInIntretinere: string;
    nrInregDeclaratieCasaDeSanatate: string;
    nrInregDeclLuareLaCunostintaROI: string;
    nrInregPlanificareaZilelorDeCO: string;
    nrZileCOConveniteInAnulCurent: string;
    platitorDeImpozit: string;

    functiaDeBaza: string;
    mail: string;
    parolaWeb: string;
    locatiePlata: string;
    bancaAngajator: string;
    iban: string;
    tipContract: string;
    sablonContractNexus: string;
    angajatorNexus: string;
    cuiAngajator: string;
    cuiLocDeMunca: string;
    ticheteDeMasa: string;
    studiiSCED: string;
    codFirma: string;
}

export class Candidat implements ICandidatLocal {
    uid: string;
    nrContract: string;
    dataContract: string;
    numeSalariat: string;
    prenumeSalariat: string;
    marca: string;
    tara: string;
    judet: string;
    localitate: string;
    strada: string;
    numar: string;
    bloc: string;
    scara: string;
    etaj: string;
    apartament: string;
    actIdentitate: string;
    serieCI: string;
    numarCI: string;
    unitateaCareAEliberatCI: string;
    dataEliberareCI: string;
    dataExpirareCI: string;
    cnp: string;
    dataAngajare: string;
    dataAngajareNedeterminat: string;
    nrLuniSaptamaniAni: string;
    dataInceputCimDeteriminat: string;
    dataSfarsitCimDeterminat: string;
    departament: string;
    locDeMunca: string;
    functia: string;
    codCOR: string;
    normaIntreagaDeLucruOreZi: string;
    normaIntreagaDeLucruOreSapt: string;
    normaPartiala: string;
    repartizareProgramPtNormaPartiala: string;
    repartizareTimpMunca: string;
    tipIntervalRepartizare: string;
    durataConcediuDeOdihna: string;
    salariulDeBazaBrut: string;
    perioadaDeProba: string;
    perioadaDePreavizInCazulConcedierii: string;
    perioadaDePreavizInCazulDemisiei: string;
    anulCurent: string;
    nrInregCerereDeAngajare: string;
    nrInregDeclaratieFunctieDeBaza: string;
    nrInregDeclaratiePersoaneInIntretinere: string;
    nrInregDeclaratieCasaDeSanatate: string;
    nrInregDeclLuareLaCunostintaROI: string;
    nrInregPlanificareaZilelorDeCO: string;
    nrZileCOConveniteInAnulCurent: string;
    platitorDeImpozit: string;
    functiaDeBaza: string;
    mail: string;
    parolaWeb: string;
    locatiePlata: string;
    bancaAngajator: string;
    iban: string;
    tipContract: string;
    sablonContractNexus: string;
    angajatorNexus: string;
    cuiAngajator: string;
    cuiLocDeMunca: string;
    ticheteDeMasa: string;
    studiiSCED: string;
    codFirma: string;
}

export const CANDIDAT_ATRIBUT = {
    nrContract: 'Număr contract',
    dataContract: 'Dată contract',
    numeSalariat: 'Nume salariat',
    prenumeSalariat: 'Prenume salariat',
    marca: 'Marca',
    tara: 'Țara',
    judet: 'Județ',
    localitate: 'Localitate',
    strada: 'Stradă',
    numar: 'Număr',
    bloc: 'Bloc',
    scara: 'Scară',
    etaj: 'Etaj',
    apartament: 'Apartament',
    actIdentitate: 'Act Identitate',
    serieCI: 'Serie CI',
    numarCI: 'Numar CI',
    unitateaCareAEliberatCI: 'Unitate eliberare CI',
    dataEliberareCI: 'Dată eliberare CI',
    dataExpirareCI: 'Dată expirare CI',
    cnp: 'CNP',
    dataAngajare: 'Dată angajare',
    dataAngajareNedeterminat: 'Dată angajare nedeterminat',
    nrLuniSaptamaniAni: 'Nr sapt/luni/ani',
    dataInceputCimDeteriminat: 'Dată inceput (determinat)',
    dataSfarsitCimDeterminat: 'Dată sfarsit (determinat)',
    departament: 'Departament',
    locDeMunca: 'Loc de muncă',
    functia: 'Funcția',
    codCOR: 'Cod COR',
    normaIntreagaDeLucruOreZi: 'Normă intreagă de lucru (ore/zi)',
    normaIntreagaDeLucruOreSapt: 'Normă intreagă de lucru (ore/sapt)',
    normaPartiala: 'Norma parțială',
    repartizareProgramPtNormaPartiala: 'Repartizarea programului pt normă parțială',
    repartizareTimpMunca: 'Repartizare timp muncă',
    tipIntervalRepartizare: 'Tip interval repartizare',

    durataConcediuDeOdihna: 'Durata concediului de odihnă',
    salariulDeBazaBrut: 'Salariul de bază brut',
    perioadaDeProba: 'Perioadă de probă',
    perioadaDePreavizInCazulConcedierii: 'Perioadă de preaviz in cazul concedierii',
    perioadaDePreavizInCazulDemisiei: 'Perioadă de preaviz in cazul demisiei',
    anulCurent: 'Anul curent',
    nrInregCerereDeAngajare: 'Nr. Inreg Cerere de angajare',
    nrInregDeclaratieFunctieDeBaza: 'Nr. Inreg Declaratie funcție de bază',
    nrInregDeclaratiePersoaneInIntretinere: 'Nr. Inreg Declaratie persoane in intreținere',
    nrInregDeclaratieCasaDeSanatate: 'Nr. Inreg Declaratie Casa de sanătate',
    nrInregDeclLuareLaCunostintaROI: 'Nr. Inreg Decl luare la cunostință ROI',
    nrInregPlanificareaZilelorDeCO: 'Nr. Inreg planificarea zilelor de CO',
    nrZileCOConveniteInAnulCurent: 'Nr. Zile CO cuvenite in anul curent',
    platitorDeImpozit: 'Plătitor de impozit',

    functiaDeBaza: 'Funcția de baza',
    mail: 'Mail',
    parolaWeb: 'Parolă web',
    locatiePlata: 'Locație plata',
    bancaAngajator: 'Banca Angajator',
    iban: 'IBAN',
    tipContract: 'Tip Contract',
    sablonContractNexus: 'Șablon Contract Nexus',
    angajatorNexus: 'Angajator (Nexus)',
    cuiAngajator: 'CUI Angajator',
    cuiLocDeMunca: 'CUI loc de muncă',
    ticheteDeMasa: 'Tichete de masă',
    studiiSCED: 'Studii ISCED (SAGA)',
}