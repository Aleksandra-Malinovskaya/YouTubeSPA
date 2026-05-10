import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: "modalIsOpen",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
  selectors: {
    selectModal: (state) => state.modalOpen,
  },
});

export const { selectModal } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
