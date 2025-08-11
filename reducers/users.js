import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
  },
});

export const { login } = usersSlice.actions;
export default usersSlice.reducer;
