import Firebase from 'firebase';  
let config = {  
    apiKey: "AIzaSyC2q8CvshJOmeKlNwVJVy-EjScC_yPVT0s",
    authDomain: "yaca-bd6f4.firebaseapp.com",
    databaseURL: "https://yaca-bd6f4.firebaseio.com",
    projectId: "yaca-bd6f4",
    storageBucket: "yaca-bd6f4.appspot.com",
    messagingSenderId: "644929303024"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();