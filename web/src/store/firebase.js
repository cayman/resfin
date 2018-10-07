import config from  '../config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(config.firebase);

const db = firebase.firestore();
const auth = firebase.auth();
auth.useDeviceLanguage();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

console.log(firebase.name);

export { db, auth, provider };