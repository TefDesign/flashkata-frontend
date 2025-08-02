import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    maFonction: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { maFonction } = usersSlice.actions;
export default usersSlice.reducer;
