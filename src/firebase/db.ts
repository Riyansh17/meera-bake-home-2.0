import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from './config';
import { FoodItem } from '@/types/item';

const COLLECTION_NAME = 'foodItems';

export const addFoodItem = async (item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding food item:', error);
    throw error;
  }
};

export const getFoodItem = async (id: string): Promise<FoodItem | null> => {
  try {
    const docRef = doc(db, 'foodItems', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as FoodItem;
    }
    return null;
  } catch (error) {
    console.error('Error getting food item:', error);
    throw error;
  }
};

export const getFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as FoodItem));
  } catch (error) {
    console.error('Error getting food items:', error);
    throw error;
  }
};

export const getAvailableFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('available', '==', true),
      orderBy('category'),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as FoodItem));
  } catch (error) {
    console.error('Error getting available food items:', error);
    throw error;
  }
};

export const getFoodItemById = async (id: string): Promise<FoodItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as FoodItem;
    }

    return null;
  } catch (error) {
    console.error('Error getting food item:', error);
    throw error;
  }
};

export const updateFoodItem = async (id: string, updates: Partial<FoodItem>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating food item:', error);
    throw error;
  }
};

export const deleteFoodItem = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting food item:', error);
    throw error;
  }
};

