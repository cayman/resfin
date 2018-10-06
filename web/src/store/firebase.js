import config from  '../config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp(config.firebase);


const db = firebase.firestore();
const auth = firebase.auth();

console.log(firebase.name);


export { db, auth };