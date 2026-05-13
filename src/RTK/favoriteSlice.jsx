import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMas: [],
};

const getUserKey = () => {
  const userName = localStorage.getItem("userName");
  return userName ? `favorites_${userName}` : null;
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    loadFavorites: (state) => {
      const key = getUserKey();
      if (key) {
        const savedMas = localStorage.getItem(key);
        state.favoriteMas = savedMas ? JSON.parse(savedMas) : [];
      }
    },
    add: (state, action) => {
      state.favoriteMas.push(action.payload);
      const key = getUserKey();
      if (key) localStorage.setItem(key, JSON.stringify(state.favoriteMas));
    },
    removeFavorite: (state, action) => {
      state.favoriteMas = state.favoriteMas.filter(
        (fav) => fav.id !== action.payload
      );
      const key = getUserKey();
      if (key) localStorage.setItem(key, JSON.stringify(state.favoriteMas));
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
      const key = getUserKey();
      if (key) localStorage.setItem(key, JSON.stringify(state.favoriteMas));
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
