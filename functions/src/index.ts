import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FunctionBuilder } from 'firebase-functions';
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
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log('val is '+JSON.stringify(snapshot.val()));
        return JSON.stringify(snapshot.val());
      }).catch(error=>{
          console.log('bla');
      });
});

exports.writeMessage = functions.https.onCall((data,context)=>{
    
    console.log('Write message..'+data.count)
    let newCount = data.count++;

    

    return admin.database().ref('utils/1').set({
        nrContract: data.count,
    })
    .then((result) => {
        console.log('Am adaugat '+newCount);
        return "OK :"+JSON.stringify(result) ;
    }).catch((error: any)=>{
        console.log('some errr appeared '+error);
        throw new functions.https.HttpsError('unknown', error.message, error);
    });


    // return {
    //     count: newCount,
    // }
});
 
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.random = functions.https.onRequest((req,res)=>{
//     const randomNumber = Math.random();
//     res.status(200).send(`<!doctype html>
//     <head>
//         <title>Random nr</title>
//     </head>
//     <body>
//         ${'your nr is: '+randomNumber}
//     </body>
//     </htlm> 
//     `);
// });
