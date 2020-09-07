import { initializeApp, auth } from 'firebase/app';
require('firebase/auth');
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);


// auth().createUserWithEmailAndPassword('rishabhr211111@gmail.com', 'password1234')
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   });

// auth().signInWithEmailAndPassword('rishabhr211111@gmail.com', 'password1234')
//   .then(res => {
//     console.log(res);
//     console.log(auth().currentUser);
//   }).catch(err => {
//     console.log(err);
//   });
