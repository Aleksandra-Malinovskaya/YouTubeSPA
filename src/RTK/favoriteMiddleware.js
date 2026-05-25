export const favoriteMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type.startsWith("favorite/") &&
    action.type !== "favorite/loadFavorites"
  ) {
    const state = store.getState().favorite;
    const userName = localStorage.getItem("userName");
    const key = userName ? `favorites_${userName}` : null;

    if (key && state.favoriteMas) {
      localStorage.setItem(key, JSON.stringify(state.favoriteMas));
    }
  }

  return result;
};
