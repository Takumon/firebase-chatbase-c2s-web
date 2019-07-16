import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAaE1utylYHVS7CRwGhFP8IOowU4OIZwQA",
  authDomain: "chatbase-c2s-web.firebaseapp.com",
  databaseURL: "https://chatbase-c2s-web.firebaseio.com",
  projectId: "chatbase-c2s-web",
  storageBucket: "",
  messagingSenderId: "26135180478",
  appId: "1:26135180478:web:55804112737d8402"
});

export const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true
});

firestore.collection("users").add({
  first: "Adasas",
  last: "Lovelace",
  born: 1815
}).then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
  console.error("Error adding document: ", error);
});

export default firebase;
