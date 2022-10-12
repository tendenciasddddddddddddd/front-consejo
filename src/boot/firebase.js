import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Agregar configuración firebase:
const firebaseConfig = {
    apiKey: "AIzaSyCtwsLsXvSj_-k696K2E3L7iKwb4K9DzY4",
    authDomain: "uemah-f440f.firebaseapp.com",
    projectId: "uemah-f440f",
    storageBucket: "uemah-f440f.appspot.com",
    messagingSenderId: "520085746911",
    appId: "1:520085746911:web:16f553890e65ad6079e56a",
    measurementId: "G-P9KE8X2W7Y"
};

/* if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("log 1");
} else {
  firebase.app();
  console.log("log 2");
}
 */
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

//let db = firebase.firestore();

//const usersCollection = db.collection('accesos')
export const usersCollection = db.collection('accesos');
/* let  tasks = 
    {
      id: "idTask",
      texto: "Aquí irá el texto de la nota",
      estado: false,
    };
  

  usersCollection.add(tasks) */


/*   export const useLoadUsers = () => {
    var users = [];
    usersCollection.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => { 
            users.push({
                id: doc.id,
                texto: doc.data().name,
                estado: doc.data().estado,
            });
            
         })
         
         return users
       });
       
  } */
//users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
/*   usersCollection.get()
  .then((snapshot) => {
  let  documents = snapshot.docs.map(doc => doc.data())
    console.log(documents)
 }) */
export const StorageRef = firebase.storage();

