import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import inputSlice from "./inputSlice";
import favoriteSlice from "./favoriteSlice";
import modalSlice from "./modalSlice";
import authSlice from "./authSlice";
import { favoriteMiddleware } from "./favoriteMiddleware";

const store = configureStore({
  reducer: {
    video: videoSlice,
    input: inputSlice,
    favorite: favoriteSlice,
    modalIsOpen: modalSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoriteMiddleware),
});

export default store;
