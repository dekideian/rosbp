// import { Location } from '../models/location.class';
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
