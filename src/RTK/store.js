import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import inputSlice from "./inputSlice";
import favoriteSlice from "./favoriteSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    video: videoSlice,
    input: inputSlice,
    favorite: favoriteSlice,
    modalIsOpen: modalSlice,
  },
});

export default store;
