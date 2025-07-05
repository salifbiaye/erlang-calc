import { useState, useEffect, useCallback } from 'react';
import { favoriteService } from '@/services/favorite-service';

type FavoriteItem = {
  id: string;
  name?: string;
  [key: string]: any;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshFavorites = useCallback(() => {
    setFavorites(favoriteService.getFavorites());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshFavorites();
    
    // Écouter les changements dans le localStorage
    const handleStorageChange = () => {
      refreshFavorites();
    };

    // Écouter à la fois les événements de stockage et nos événements personnalisés
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-updated', handleStorageChange);
    };
  }, [refreshFavorites]);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    if (favoriteService.isFavorite(item.id)) {
      favoriteService.removeFavorite(item.id);
    } else {
      favoriteService.addFavorite(item);
    }
    // Pas besoin d'appeler refreshFavorites ici car l'événement déclenchera le rafraîchissement
  }, []);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    refreshFavorites,
    isFavorite: useCallback((itemId: string) => 
      favoriteService.isFavorite(itemId)
    , [])
  };
}
