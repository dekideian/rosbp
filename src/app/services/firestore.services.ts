import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import { AngularFirestore, Query } from "@angular/fire/firestore";
import { responsabiliConverter, utilizatoriConverter } from "./convertors";
import { Utilizator } from "../models/utilizator.class";
import { noUndefined } from "@angular/compiler/src/util";
import { JsonpClientBackend } from "@angular/common/http";


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
}