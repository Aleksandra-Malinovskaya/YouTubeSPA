import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    change: (state, action) => {
      state.inputValue = action.payload;
    },
  },
  selectors: {
    selectValue: (state) => state.inputValue,
  },
});

export const { selectValue } = inputSlice.selectors;
export const { change } = inputSlice.actions;
export default inputSlice.reducer;
