// import { Location } from '../models/location.class';
import { Candidat } from '../models/Candidat.class';
import { Client } from '../models/Client.class';
import { Firma } from '../models/Firma.class';
import { Responsabil } from '../models/responsabil.class';
import { Utilizator } from '../models/utilizator.class';

/* ================================================================= */
export const utilizatoriConverter = {
    toFirestore: function(utilizator: Utilizator) {
        return {
            nume: utilizator.nume,
            email: utilizator.email,
            };
    },

    fromFirestore: function(snapshot, options): Utilizator{
        const id = snapshot.id;
        const data = snapshot.data(options);
        return new Utilizator({id:id, nume: data.nume, email:data.email});
    }
  }

  export const responsabiliConverter = {
    toFirestore: function(responsabil: Responsabil) {
        return {
            nume: responsabil.nume,
            email: responsabil.email,
            numeFirma: responsabil.numeFirma,
            firmaUID: responsabil.firmaUID
            };
    },

    fromFirestore: function(snapshot, options): Responsabil{
        const id = snapshot.id;
        const data = snapshot.data(options);
        return new Responsabil({id:id, nume: data.nume, email:data.email, numeFirma: data.numeFirma, firmaUID: data.firmaUID});
    }
  }

  export const clientiConverter = {
    toFirestore: function(client: Client) {
        return {
            nume: client.nume,
            email: client.email,
            numeFirma: client.numeFirma,
            firmaUID: client.firmaUID
            };
    },

    fromFirestore: function(snapshot, options): Client{
        const id = snapshot.id;
        const data = snapshot.data(options);
        return new Client({id:id, nume: data.nume, email:data.email, numeFirma: data.numeFirma, firmaUID: data.firmaUID});
    }
  }

  export const firmeConverter = {
    toFirestore: function(firma: Firma) {
        return {            
            CUI: firma.CUI,
            nr: firma.nr,
            nume: firma.nume,
            regComert: firma.regComert,
            rep: firma.rep,
            sediu: firma.sediu,
            telefon: firma.telefon
            };
    },

    fromFirestore: function(snapshot, options): Firma{
        const id = snapshot.id;
        const data = snapshot.data(options);
        return new Firma({
            id:id,             
            CUI:data.CUI, 
            nr: data.nr, 
            nume: data.nume, 
            regComert: data.regComert,
            rep: data.rep,
            sediu: data.sediu,
            telefon: data.telefon
        });
    }
  }

  export const candidatiConverter = {
    toFirestore: function(candidat: Candidat) {
        return {
            actIdentitate: candidat.actIdentitate,
            angajatorNexus: candidat.angajatorNexus,
            anulCurent: candidat.anulCurent,
            apartament: candidat.apartament,
            bancaAngajator: candidat.bancaAngajator,
            bloc: candidat.bloc,
            cnp: candidat.cnp,
            codCOR: candidat.codCOR,
            codFirma: candidat.codFirma,
            cuiAngajator: candidat.cuiAngajator,
            cuiLocDeMunca: candidat.cuiLocDeMunca,
            dataAngajare: candidat.dataAngajare,
            dataAngajareNedeterminat: candidat.dataAngajareNedeterminat,
            dataContract: candidat.dataContract,
            dataEliberareCI: candidat.dataEliberareCI,
            dataExpirareCI: candidat.dataExpirareCI,
            dataInceputCimDeterminat: candidat.dataInceputCimDeterminat,
            dataSfarsitCimDeterminat: candidat.dataSfarsitCimDeterminat,
            departament: candidat.departament,
            durataConcediuDeOdihna: candidat.durataConcediuDeOdihna,
            etaj: candidat.etaj,
            functia: candidat.functia,
            functiaDeBaza: candidat.functiaDeBaza,
            functieDeConducere: candidat.functieDeConducere,
            iban: candidat.iban,
            judet: candidat.judet,
            locDeMunca: candidat.locDeMunca,
            localitate: candidat.localitate,
            locatiePlata: candidat.locatiePlata,
            mail: candidat.mail,
            marca: candidat.marca,
            normaIntreagaDeLucruOreSapt: candidat.normaIntreagaDeLucruOreSapt,
            normaIntreagaDeLucruOreZi: candidat.normaIntreagaDeLucruOreZi,
            normaPartiala: candidat.normaPartiala,
            nrContract: candidat.nrContract,
            nrFirma: candidat.nrFirma,
            nrInregCerereDeAngajare: candidat.nrInregCerereDeAngajare,
            nrInregDeclLuareLaCunostintaROI: candidat.nrInregDeclLuareLaCunostintaROI,
            nrInregDeclaratieCasaDeSanatate: candidat.nrInregDeclaratieCasaDeSanatate,
            nrInregDeclaratieFunctieDeBaza: candidat.nrInregDeclaratieFunctieDeBaza,
            nrInregDeclaratiePersoaneInIntretinere: candidat.nrInregDeclaratiePersoaneInIntretinere,
            nrInregPlanificareaZilelorDeCO: candidat.nrInregPlanificareaZilelorDeCO,
            nrLuniSaptamaniAni: candidat.nrLuniSaptamaniAni,
            nrZileCOConveniteInAnulCurent: candidat.nrZileCOConveniteInAnulCurent,
            numar: candidat.numar,
            numarCI: candidat.numarCI,
            numeFirma: candidat.numeFirma,
            numeSalariat: candidat.numeSalariat,
            parolaWeb: candidat.parolaWeb,
            perioadaDePreavizInCazulConcedierii: candidat.perioadaDePreavizInCazulConcedierii,
            perioadaDePreavizInCazulDemisiei: candidat.perioadaDePreavizInCazulDemisiei,
            perioadaDeProba: candidat.perioadaDeProba,
            platitorDeImpozit: candidat.platitorDeImpozit,
            prenumeSalariat: candidat.prenumeSalariat,
            regComertFirma: candidat.regComertFirma,
            repFirma: candidat.repFirma,
            repartizareProgramPtNormaPartiala: candidat.repartizareProgramPtNormaPartiala,
            repartizareTimpMunca: candidat.repartizareTimpMunca,
            sablonContractNexus: candidat.sablonContractNexus,
            salariuDeBazaBrut: candidat.salariuDeBazaBrut,
            scara: candidat.scara,
            sediuFirma: candidat.sediuFirma,
            serieCI: candidat.serieCI,
            strada: candidat.strada,
            studiiSCED: candidat.studiiSCED,
            tara: candidat.tara,
            telefonFirma: candidat.telefonFirma,
            ticheteDeMasa: candidat.ticheteDeMasa,
            tipContract: candidat.tipContract,
            tipIntervalRepartizare: candidat.tipIntervalRepartizare,
            unitateaCareAEliberatCI: candidat.unitateaCareAEliberatCI
            };
    },

    fromFirestore: function(snapshot, options): Candidat{
        const id = snapshot.id;
        const data = snapshot.data(options);
        return new Candidat({id:id, 
            actIdentitate: data.actIdentitate,
            angajatorNexus: data.angajatorNexus,
            anulCurent: data.anulCurent,
            apartament: data.apartament,
            bancaAngajator: data.bancaAngajator,
            bloc: data.bloc,
            cnp: data.cnp,
            codCOR: data.codCOR,
            codFirma: data.codFirma,
            cuiAngajator: data.cuiAngajator,
            cuiLocDeMunca: data.cuiLocDeMunca,
            dataAngajare: data.dataAngajare,
            dataAngajareNedeterminat: data.dataAngajareNedeterminat,
            dataContract: data.dataContract,
            dataEliberareCI: data.dataEliberareCI,
            dataExpirareCI: data.dataExpirareCI,
            dataInceputCimDeterminat: data.dataInceputCimDeterminat,
            dataSfarsitCimDeterminat: data.dataSfarsitCimDeterminat,
            departament: data.departament,
            durataConcediuDeOdihna: data.durataConcediuDeOdihna,
            etaj: data.etaj,
            functia: data.functia,
            functiaDeBaza: data.functiaDeBaza,
            functieDeConducere: data.functieDeConducere,
            iban: data.iban,
            judet: data.judet,
            locDeMunca: data.locDeMunca,
            localitate: data.localitate,
            locatiePlata: data.locatiePlata,
            mail: data.mail,
            marca: data.marca,
            normaIntreagaDeLucruOreSapt: data.normaIntreagaDeLucruOreSapt,
            normaIntreagaDeLucruOreZi: data.normaIntreagaDeLucruOreZi,
            normaPartiala: data.normaPartiala,
            nrContract: data.nrContract,
            nrFirma: data.nrFirma,
            nrInregCerereDeAngajare: data.nrInregCerereDeAngajare,
            nrInregDeclLuareLaCunostintaROI: data.nrInregDeclLuareLaCunostintaROI,
            nrInregDeclaratieCasaDeSanatate: data.nrInregDeclaratieCasaDeSanatate,
            nrInregDeclaratieFunctieDeBaza: data.nrInregDeclaratieFunctieDeBaza,
            nrInregDeclaratiePersoaneInIntretinere: data.nrInregDeclaratiePersoaneInIntretinere,
            nrInregPlanificareaZilelorDeCO: data.nrInregPlanificareaZilelorDeCO,
            nrLuniSaptamaniAni: data.nrLuniSaptamaniAni,
            nrZileCOConveniteInAnulCurent: data.nrZileCOConveniteInAnulCurent,
            numar: data.numar,
            numarCI: data.numarCI,
            numeFirma: data.numeFirma,
            numeSalariat: data.numeSalariat,
            parolaWeb: data.parolaWeb,
            perioadaDePreavizInCazulConcedierii: data.perioadaDePreavizInCazulConcedierii,
            perioadaDePreavizInCazulDemisiei: data.perioadaDePreavizInCazulDemisiei,
            perioadaDeProba: data.perioadaDeProba,
            platitorDeImpozit: data.platitorDeImpozit,
            prenumeSalariat: data.prenumeSalariat,
            regComertFirma: data.regComertFirma,
            repFirma: data.repFirma,
            repartizareProgramPtNormaPartiala: data.repartizareProgramPtNormaPartiala,
            repartizareTimpMunca: data.repartizareTimpMunca,
            sablonContractNexus: data.sablonContractNexus,
            salariuDeBazaBrut: data.salariuDeBazaBrut,
            scara: data.scara,
            sediuFirma: data.sediuFirma,
            serieCI: data.serieCI,
            strada: data.strada,
            studiiSCED: data.studiiSCED,
            tara: data.tara,
            telefonFirma: data.telefonFirma,
            ticheteDeMasa: data.ticheteDeMasa,
            tipContract: data.tipContract,
            tipIntervalRepartizare: data.tipIntervalRepartizare,
            unitateaCareAEliberatCI: data.unitateaCareAEliberatCI            
        });
    }
  }
 