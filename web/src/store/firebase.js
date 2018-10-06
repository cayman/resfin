import config from  '../config';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  projectId: config.databaseId,
  databaseURL: config.databaseURL
});

console.log(firebase.name);

const db = firebase.firestore();

export { db };