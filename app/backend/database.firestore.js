import { getFirestore } from 'firebase/firestore';
import app from './firebase.config';

import { addDoc, getDocs, collection } from 'firebase/firestore';

const databaseRef = getFirestore(app);
export const createDocument = async (collectionName, dataContent) => {
  try {
    return await addDoc(collection(databaseRef, collectionName), dataContent);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export class DataStore {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.databaseRef = databaseRef;
  }
  async create(data) {
    try {
      return await addDoc(
        collection(this.databaseRef, this.collectionName),
        data
      );
    } catch (e) {
      throw new Error(`Error adding document: ${e}`);
    }
  }

  async get() {
    try {
      let result = [];
      const querySnapshot = await getDocs(
        collection(this.databaseRef, this.collectionName)
      );
      querySnapshot.forEach((doc, i) => {
        let data = {
          id: doc.id,
          ...doc.data(),
        };

        result.push(data);
      });

      return result;
    } catch (e) {
      throw new Error(`Error getting documents: ${e}`);
    }
  }
}
