import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, loginUserOK, setAuthLoading } from './authSlice';
import { firebaseAuth } from 'backend/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUserPayload } from './authType';

export const loginUserReq = createAsyncThunk(
  'auth',
  async (payload: loginUserPayload, { rejectWithValue, dispatch }) => {
    dispatch(setAuthLoading(true));
    signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
      .then((result) => {
        dispatch(setAuthLoading(false));
        const user = result.user;
        const currentUser = {
          id: user.uid,
          email: user.email,
        };
        dispatch(loginUser(true));
        return currentUser;
      })
      .catch((err) => {
        dispatch(setAuthLoading(false));
        dispatch(loginUser(false));
        return rejectWithValue(err);
      });
  }
);
