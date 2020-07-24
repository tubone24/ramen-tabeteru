import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDHOfLRaKrkSjwXBUy19fpTLGJ3DMSFexc',
    authDomain: 'ramen-tabeteru.firebaseapp.com',
    databaseURL: 'https://ramen-tabeteru.firebaseio.com',
    projectId: 'ramen-tabeteru',
    storageBucket: 'ramen-tabeteru.appspot.com',
    messagingSenderId: '829428629803',
    appId: '1:829428629803:web:c7d14ba075d3b2ff6c056e',
    measurementId: 'G-ZQ1F43BE7J',
  })
}

export default firebase
