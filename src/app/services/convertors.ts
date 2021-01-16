// import { Location } from '../models/location.class';
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

// export const locationConverter = {
//     toFirestore: function(location: Location) {
//         return {
//             name: location.name,
//             businessId: location.businessId
//             };
//     },

//     fromFirestore: function(snapshot, options): Location{
//         const id = snapshot.id;
//         const data = snapshot.data(options);
//         return new Location(id, data.name, data.businessId);
//     }
//   }
