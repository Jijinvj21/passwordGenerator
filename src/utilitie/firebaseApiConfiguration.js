import { collection, addDoc ,getFirestore,getDocs , deleteDoc ,doc} from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAT7hOcmbCaA",
  authDomain: "pass",
  projectId: "pas8",
  storageBucket: "paom",
  messagingSenderId: "19524",
  appId: "1d1",
  measurementId: "9ED"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app);

export {auth,provider,db,collection,addDoc,getDocs,deleteDoc,doc }