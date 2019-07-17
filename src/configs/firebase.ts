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

firebase.firestore.FieldValue.serverTimestamp()
export const firestore = firebase.firestore();
// firestore.settings({
//   timestampsInSnapshots: true
// });


export default firebase;
