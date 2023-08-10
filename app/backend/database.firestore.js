import { getFirestore } from 'firebase/firestore';
import app from './firebase.config';

import { addDoc, collection } from 'firebase/firestore';

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
    this.collection = collectionName;
    this.databaseRef = databaseRef;
  }
  async create(data) {
    try {
      return await addDoc(collection(this.databaseRef, this.collection), data);
    } catch (e) {
      throw new Error(`Error adding document: ${e}`);
    }
  }

  async get() {}
}
