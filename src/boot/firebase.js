import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Agregar configuración firebase:
const firebaseConfig = {
    apiKey: "AIzaSyA6x0KZAi9JB9iHKIQk2leOrGfuuatNA4c",
    authDomain: "back-ends.firebaseapp.com",
    databaseURL: "https://back-ends-default-rtdb.firebaseio.com",
    projectId: "back-ends",
    storageBucket: "back-ends.appspot.com",
    messagingSenderId: "144052097147",
    appId: "1:144052097147:web:cdb1a963ea6d425fcad2de",
    measurementId: "G-S41ZEJ6E0W"
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

