
import { db, collection, addDoc } from "./firebaseApiConfiguration";
// import { toast } from "react-hot-toast";

export const createDB = (email,passwordName, password) => {
  const notesCollection = collection(db, email);

  const newPasswordData = {
    passwordName:passwordName,
    Password: password,
  };

  addDoc(notesCollection, newPasswordData)
    .then((docRef) => {
      console.log('Document added with ID:', docRef.id);
      
      // toast.success( "password saved",{ autoClose: 5 });
      // toast.dismiss()
      // window.location.reload();
    })
    .catch((error) => {
      console.error('Error adding document:', error);
    });
};
