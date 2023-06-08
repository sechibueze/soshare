import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 70,
  user: {
    full_name: '',
    email: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    registerUser: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const { loginUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
