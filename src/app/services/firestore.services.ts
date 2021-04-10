import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import { AngularFirestore, Query } from "@angular/fire/firestore";
import { candidatiConverter, clientiConverter, firmeConverter, responsabiliConverter, utilizatoriConverter } from "./convertors";
import { Utilizator } from "../models/utilizator.class";
import { noUndefined } from "@angular/compiler/src/util";
import { JsonpClientBackend } from "@angular/common/http";
import { Firma } from "../models/Firma.class";
import { Client } from "../models/Client.class";
import { Candidat } from "../models/Candidat.class";
import { Responsabil } from "../models/responsabil.class";


@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
  
  
    constructor(private firestore: AngularFirestore) {
    }
// ============================================= General Firestore Functions =============================================
    async addDocument(
        collection: string,
        document:any,
        database: firebase.firestore.Firestore = this.firestore.firestore) {

    return await database.collection(collection)
            .add(document);
    }

    async removeDocument(
        collection: string,
        documentId: string,
        database: firebase.firestore.Firestore = this.firestore.firestore) {
        return await database.collection(collection).doc(documentId).delete();
    }
    
    // async removeDocumentWhereAttributeEquals(
    //     collection: string,
    //     attributeName: string,
    //     value: string,
    //     database: firebase.firestore.Firestore = this.firestore.firestore) {
    //     return await database.collection(collection).doc(documentId).delete();
    // }

    async addConvertedDocument<T>(
        collection: string, 
        document: T,         
        converter: firebase.firestore.FirestoreDataConverter<T>,
        database: firebase.firestore.Firestore = this.firestore.firestore){

        return await database.collection(collection)
            .withConverter(converter)
            
            .add(document,);
    }
/* ====================== Read specific functions ====================== */
    async getDocuments(
        collectionName: string,
        database: firebase.firestore.Firestore = this.firestore.firestore) {
    
        let snapshot = await database.collection(collectionName).get();
    
        let foundDocuments = [];
        snapshot.forEach(doc => {
            foundDocuments.push(doc.data())
        })
        return foundDocuments;
    }

    async getConvertedDocument<T>(
        collectionName: string,
        documentId: string,         
        converter: firebase.firestore.FirestoreDataConverter<T>,
        database: firebase.firestore.Firestore = this.firestore.firestore): Promise<T> {
    
        let documentSnapshot = await database.collection(collectionName)
                                      .doc(documentId)
                                      .withConverter(converter).get();
    
        return documentSnapshot.data();
    
    }

    async getConvertedDocuments<T>(
        collectionName: string,        
        converter: firebase.firestore.FirestoreDataConverter<T>,
        database: firebase.firestore.Firestore = this.firestore.firestore): Promise<T[]> {
    
        let snapshot = await database.collection(collectionName)
                                      .withConverter(converter).get();
    
        let foundDocuments = [];
        snapshot.forEach(doc => {
          foundDocuments.push(doc.data())
        })
        return foundDocuments;
      }
    
// SAMPLES
    // filterByBusinessId(
    //     collectionName: string,
    //     businessId: string,
    //     database: firebase.firestore.Firestore){
    //         return database.collection(collectionName)
    //           .where('businessId', '==', businessId);
    // }
    filterByFirmaId(
        collectionName: string,
        firmaId: string,
        database: firebase.firestore.Firestore = this.firestore.firestore){
            return database.collection(collectionName)
              .where('firmaId', '==', firmaId);
    }
    filterByAttributeValue(
        collectionName: string,
        attribute: string,
        value: string,
        database: firebase.firestore.Firestore = this.firestore.firestore){
            return database.collection(collectionName)
              .where(attribute, '==', value);
    }

    async getFilteredConvertedDocuments<T>(
        query: Query,
        converter: firebase.firestore.FirestoreDataConverter<T>): Promise<T[]> {
    
        const snapshot = await query.withConverter(converter).get();
    
        let foundDocuments = [];
        snapshot.forEach(doc => {
          foundDocuments.push(doc.data())
        })
        return foundDocuments;
      }

      /* ====================== Location Specific Functions ====================== */

    // async getLocationList(businessId: string) {
    //     const query = this.filterByBusinessId('locations', businessId, this.firestore.firestore)
    //     return this.getFilteredConvertedDocuments(query, locationConverter);
    // }
    

    // Utilizatori
    async getUtilizatoriList(firmaId: string):Promise<Utilizator[]> {
        const query = this.filterByFirmaId('angajati', firmaId, this.firestore.firestore)
        return this.getFilteredConvertedDocuments(query, utilizatoriConverter);
    }
    async getAllUtilizatoriList():Promise<Utilizator[]> {        
        return this.getConvertedDocuments('angajati', utilizatoriConverter);
    }   
    async removeUtilizator(utilizatorId: string, email: string) {
        this.removeDocument(`angajati`, utilizatorId);
        this.removeDocument(`users`, email);

        const query = this.filterByAttributeValue(`responsabili`, 'email', email);
        const snapshot = await query.withConverter(responsabiliConverter).get();
        let foundDocuments = [];
        snapshot.forEach(doc => {            
          this.removeDocument(`responsabili`, doc.data().id);
        })
    }
    async addUtilizator(utilizator: Partial<Utilizator>) {        
        let utilizatorNou = this.addConvertedDocument('angajati', utilizator, utilizatoriConverter);        
        this.firestore.firestore.doc(`users/${utilizator.email}`).set({company:'rosbp'}, {merge: true});
        return utilizatorNou;
    }

// Firme 
    async getFirmaForId(firmaId): Promise<Firma> {
        return this.getConvertedDocument(`firme`, firmaId, firmeConverter);
    }

    async getAllFirmeList():Promise<Firma[]> {        
        return this.getConvertedDocuments('firme', firmeConverter);
    }  

    async removeFirma(firmaId: string) {
        this.removeDocument(`firme`, firmaId);
        // trebuie sa cautam responsabilii pt aceasta firma (array)
        // - stergem toti responsabili cu aceasta firmaId
        // functie pe responsabili. S-a sters cineva din responsabili ? .. verificam daca acel 
        //email mai este responsabil sau client. Daca nu -> stergem si din users. 
        
        
        // trbuie sa cautam clientii pt aceasta firma
        // - stergem toti clientii cu aceasta firma id
        // functie pe responsabili. S-a sters cineva din responsabili ? .. verificam daca acel 
        //email mai este responsabil sau client. Daca nu -> stergem si din users. 
        


        // functie pe firma ..
        // - s-a sters o firma?.. sterge din responsabili, clienti.. si poate si candidati. 
        const query = this.filterByAttributeValue(`responsabili`, 'firmaUID', firmaId);
        const snapshot = await query.withConverter(responsabiliConverter).get();        
        snapshot.forEach(doc => {      
            //Responsabilul este Userul.. daca a fost sters ca responsabil, il lasam inca angajat. 
            // Daca vrea cineva mai mult, sterge de la angajati      
          this.removeDocument(`responsabili`, doc.data().id);
        });

        const queryClienti = this.filterByAttributeValue(`clienti`, 'firmaUID', firmaId);
        const snapshotClienti = await queryClienti.withConverter(clientiConverter).get();
        snapshotClienti.forEach(doc => {  
            //aici avem emailul omului..           
            // luam mailul si il stergem , ii dam mumum:D
            let email = doc.data().email;
            this.removeDocument(`users`, email);
          this.removeDocument(`clienti`, doc.data().id);
        });

        const queryCandidati = this.filterByAttributeValue(`candidati`, 'codFirma', firmaId);
        const snapshotCandidati = await queryCandidati.withConverter(candidatiConverter).get();
        snapshotCandidati.forEach(doc => {              
          this.removeDocument(`candidati`, doc.data().id);
        });    
        //jita care esti, sterge si din storage + templates .. 
        //cand stergi un utilizator, sterge-i si fisierele pe care le-a avut uploadate.     
    }
    //adaugare client - pt firma (hr)
    async addClient(client: Partial<Client>) {        
        // console.log('teoretic adaugam client -> '+client)
        let clientNou = await this.addConvertedDocument(`clienti`, client, clientiConverter);   
        // console.log('teoretic am adaugat client '+clientNou.id);
        this.firestore.firestore.doc(`users/${client.email}`).set({company:client.firmaUID}, {merge: true});
        return clientNou;
    }
    async addFirma(firma: Partial<Firma>) {     
        console.log(`in serviciu avem `+JSON.stringify(firma) +' si '+firma.codCaen);
        let clientNou = await this.addConvertedDocument(`firme`, firma, firmeConverter);           
        return clientNou;
    }

//candidati
    async getCandidatiList(firmaUID: string):Promise<Candidat[]> {     
        if(firmaUID==='admin') {
            return this.getConvertedDocuments('candidati', candidatiConverter);
        } else {
            const query = this.filterByAttributeValue('candidati', 'codFirma', firmaUID);
            return this.getFilteredConvertedDocuments(query, candidatiConverter);
        }            
    }   
    
//responsabili
    async getResponsabiliList(email: string):Promise<Responsabil[]> {
        const query = this.filterByAttributeValue('responsabili', 'email', email)
        return this.getFilteredConvertedDocuments(query, responsabiliConverter);
    }   
//clienti
    async getClientiList(email: string):Promise<Client[]> {
        const query = this.filterByAttributeValue('clienti', 'email', email)
        return this.getFilteredConvertedDocuments(query, clientiConverter);
    }        
}