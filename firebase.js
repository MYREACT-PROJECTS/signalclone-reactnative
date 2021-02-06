import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAqSrsk8MmypX8zD5OKq87-mI270DQW4Kc",
    authDomain: "signal-clone-9235d.firebaseapp.com",
    projectId: "signal-clone-9235d",
    storageBucket: "signal-clone-9235d.appspot.com",
    messagingSenderId: "939501732251",
    appId: "1:939501732251:web:725d726c924992c525e13e"
  };

  let app;
  if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig)
  }else{
    app = firebase.app()
  }

  const db=app.firestore();
  const auth = firebase.auth();

  export {db,auth}
