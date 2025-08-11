import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  id: null,
  theme: "light",
  hasDisabledListening: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.id = null;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    disabledListening: (state, action) => {
      state.hasDisabledListening = action.payload;
    },
  },
});

export const { login, logout, changeTheme, disabledListening } =
  usersSlice.actions;
export default usersSlice.reducer;
