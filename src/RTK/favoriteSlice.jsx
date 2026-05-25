import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMas: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      state.favoriteMas = action.payload || [];
    },
    add: (state, action) => {
      state.favoriteMas.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteMas = state.favoriteMas.filter(
        (fav) => fav.id !== action.payload
      );
    },
    edit: (state, action) => {
      const favorite = state.favoriteMas.find(
        (item) => item.id === action.payload.id
      );
      if (favorite) {
        favorite.text = action.payload.text;
        favorite.name = action.payload.name;
        favorite.sortBy = action.payload.sortBy;
        favorite.maxCount = action.payload.maxCount;
      }
    },
  },
  selectors: {
    selectFavorites: (state) => state.favoriteMas,
  },
});
export const { selectFavorites } = favoriteSlice.selectors;
export const { add, removeFavorite, edit, loadFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
