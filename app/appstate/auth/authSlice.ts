import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {},
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginUser: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setLoading: setAuthLoading,

  loginUser,
} = authSlice.actions;

export default authSlice.reducer;
