import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
  apiKey: 'AIzaSyCduDdTdSztG2fCXDrwPDW-YDQf6F0UFHY',
  authDomain: 'meu-app-7ca53.firebaseapp.com',
  databaseURL: 'https://meu-app-7ca53-default-rtdb.firebaseio.com',
  projectId: 'meu-app-7ca53',
  storageBucket: 'meu-app-7ca53.appspot.com',
  messagingSenderId: '671718487647',
  appId: '1:671718487647:web:7fab2688d8564419e08dea',
  measurementId: 'G-4BC1N1HRHZ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
