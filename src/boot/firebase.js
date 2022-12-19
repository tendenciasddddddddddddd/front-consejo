import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Agregar configuración firebase:
const firebaseConfig = {
  apiKey: "AIzaSyB_HGcSDUNdCJ5_cxtNjLZJxD90tLWRAig",
  authDomain: "libertad-5a1fe.firebaseapp.com",
  projectId: "libertad-5a1fe",
  storageBucket: "libertad-5a1fe.appspot.com",
  messagingSenderId: "230060676813",
  appId: "1:230060676813:web:c5057684c9f071a4ed3b84",
  measurementId: "G-DRWLHJMY3H"
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

