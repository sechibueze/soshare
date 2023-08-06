import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth/authSlice';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['isLoggedIn'],
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const appReducers = combineReducers({
  auth: persistedAuthReducer,
});

export const store = configureStore({
  reducer: appReducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [thunk],
});
