export interface ICandidat {
    uid: string;
    nume: string;
    email: string;
    firma: string;
}

export interface ICandidatLocal {

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
    dataSfarsitCimDeterinat: string;
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
    dataExpirareCI: 'Dată expirării CI',
    cnp: 'CNP',
    dataAngajare: 'Dată angajare',
    dataAngajareNedeterminat: 'Dată angajare nedeterminat',
    nrLuniSaptamaniAni: 'Nr sapt/luni/ani',
    dataInceputCimDeteriminat: 'Dată inceput (determinat)',
    dataSfarsitCimDeterinat: 'Dată sfarsit (determinat)',
    departament: 'Departament',
    locDeMunca: 'Loc de muncă',
    functia: 'Funcția',
    codCOR: 'Cod COR',
    normaIntreagaDeLucruOreZi: 'Norma intreaga de lucru (ore/zi)',
    normaIntreagaDeLucruOreSapt: 'Norma intreaga de lucru (ore/sapt)',
    normaPartiala: 'Norma parțială',
    repartizareProgramPtNormaPartiala: 'Repartizarea programului pt norma parțială',
    repartizareTimpMunca: 'Repartizare timp munca',
    tipIntervalRepartizare: 'Tip interval repartizare',
}