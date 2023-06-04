import { AsyncStorage } from 'react-native';

export const saveToLocalStorage = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch {
    return '';
  }
};
export const getFromLocalStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return '';
  }
};
