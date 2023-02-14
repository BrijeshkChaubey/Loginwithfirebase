import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD8ubYjaBA1trBw1GGxEAEnSlh3MkzRwsM",
  authDomain: "login-and-register-d53f1.firebaseapp.com",
  databaseURL: "https://login-and-register-d53f1-default-rtdb.firebaseio.com",
  projectId: "login-and-register-d53f1",
  storageBucket: "login-and-register-d53f1.appspot.com",
  messagingSenderId: "522556508845",
  appId: "1:522556508845:web:0715e9ad15f765573dd424",
  measurementId: "G-8WZYN6T3G4"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth};
