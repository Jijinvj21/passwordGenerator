import { collection, addDoc ,getFirestore,getDocs , deleteDoc ,doc} from "firebase/firestore"; 
// import dotenv from 'dotenv'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
console.log(process.env.REACT_APP_APIKEY)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINDSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREEMENDID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app);

export {auth,provider,db,collection,addDoc,getDocs,deleteDoc,doc }