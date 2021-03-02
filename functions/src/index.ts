import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// from the client 

// mai fac o functie.. in write pe firestore.. la tabela noastra de salariati.
// atunci sa updatam acest contract nr.. iar in ui in salariati, doar referim functia care returneaza nr de la firebase
// si aia e .. 

exports.readMessage = functions.https.onCall((data,context)=>{
    
    const utilsRealtimeDb = admin.database().ref('utils/1');
    return utilsRealtimeDb.once('value').then((snapshot) => {    
        console.log('val is '+JSON.stringify(snapshot.val()));
        return (+snapshot.val().nrContract) + 1;
      }).catch(error=>{
          console.log('An error appeared when reading the count');
      });
});

exports. = functions.https.onCall((data,context)=>{
    
    console.log('Write message..'+data.count)
    let receivedNr = data.count;
    let nextNr = 0;
    const utilsRealtimeDb = admin.database().ref('utils/1');
    return utilsRealtimeDb.once('value').then((snapshot) => {    
        console.log('val is '+JSON.stringify(snapshot.val()));
        nextNr = (+snapshot.val().nrContract) + 1
        nextNr = (nextNr>receivedNr)?nextNr:receivedNr;
        return admin.database().ref('utils/1').set({
            nrContract: nextNr,
        })
        .then((result) => {
            console.log('Am salvat '+nextNr);
            return nextNr;
        }).catch((error: any)=>{
            console.log('some errr appeared '+error);
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
    
      }).catch(error=>{
          console.log('An error appeared when reading the count');
      });
    

    

    // return {
    //     count: newCount,
    // }
});
export const createCustomClaim = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {


    const newValue = change.after.data();
    const customClaims = {
      level: newValue.company,
    };
    const email = newValue.uid;
    return admin.auth().getUserByEmail(email).then(user => {
      return  admin.auth().setCustomUserClaims(user.uid, customClaims);
    }).catch(error => {
        console.log(error);
    });
});