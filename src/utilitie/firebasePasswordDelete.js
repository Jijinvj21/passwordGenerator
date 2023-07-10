import { db, deleteDoc, doc } from "./firebaseApiConfiguration";



export const deleteData = async (email, id) => {
  try {
    await deleteDoc(doc(db, email, id));
    
    return "deleted";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  
