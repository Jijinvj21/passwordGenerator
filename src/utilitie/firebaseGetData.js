import { db, collection, getDocs } from "./firebaseApiConfiguration";

export const getData = (email) => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, email))
      .then((querySnapshot) => {
        console.log(querySnapshot);
        resolve(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
