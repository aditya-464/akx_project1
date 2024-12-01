import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "login",
  username: "",
  password: "",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePage, changeUsername } = pageSlice.actions;

export default pageSlice.reducer;
