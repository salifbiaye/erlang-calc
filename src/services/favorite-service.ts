const FAVORITES_KEY = 'erlang_calc_favorites';

type FavoriteItem = {
  id: string;
  name?: string;
  [key: string]: any;
};

const favoriteService = {
  getFavorites: (): FavoriteItem[] => {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite: (item: FavoriteItem): void => {
    if (typeof window === 'undefined') return;
    const favorites = favoriteService.getFavorites();
    if (!favorites.some(fav => fav.id === item.id)) {
      const updatedFavorites = [...favorites, item];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event('favorites-updated'));
    }
  },

  removeFavorite: (itemId: string): void => {
    if (typeof window === 'undefined') return;
    const favorites = favoriteService.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (itemId: string): boolean => {
    if (typeof window === 'undefined') return false;
    const favorites = favoriteService.getFavorites();
    return favorites.some(fav => fav.id === itemId);
  }
};

export { favoriteService };
