import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { simulationService } from '@/services/simulation.service';

type FavoriteItem = {
  id: string;
  name?: string;
  [key: string]: any;
};

export function useFavorites() {
  const queryClient = useQueryClient();
  const queryKey = ['favorites'];

  // Récupérer les simulations favorites
  const { data: favorites = [], isLoading } = useQuery<FavoriteItem[]>({
    queryKey,
    queryFn: async () => {
      const response = await simulationService.getSimulations({ favoritesOnly: true });
      return response.data;
    },
  });

  // Mutation pour basculer l'état favori d'une simulation
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      return simulationService.toggleFavorite(id, !isFavorite);
    },
    onSuccess: () => {
      // Invalider et rafraîchir les données des favoris
      queryClient.invalidateQueries({ queryKey });
      // Invalider également la liste complète des simulations si nécessaire
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });

  // Vérifier si un élément est dans les favoris
  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  // Rafraîchir manuellement les favoris
  const refreshFavorites = () => {
    return queryClient.invalidateQueries({ queryKey });
  };

  return {
    favorites,
    isLoading,
    toggleFavorite: (item: FavoriteItem) => 
      toggleFavorite({ id: item.id, isFavorite: isFavorite(item.id) }),
    refreshFavorites,
    isFavorite,
  };
}
