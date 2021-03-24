import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC27884_UFyJsDGG-M61CK7IQw9m6uACGQ',
  authDomain: 'sauna-app.firebaseapp.com',
  databaseURL: 'https://sauna-app.firebaseio.com',
  projectId: 'sauna-app',
  storageBucket: 'sauna-app.appspot.com',
  messagingSenderId: '272419458538',
  appId: '1:272419458538:web:97f1c0a3ba2ffe9b5d7693'
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth;
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }
}

export default Firebase;
