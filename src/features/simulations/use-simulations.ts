import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { simulationService } from '@/services/simulation.service';
import { notify } from '@/lib/notifications';

export interface PaginationParams {
  page?: number;
  limit?: number;
  favoritesOnly?: boolean;
  search?: string;
}

export interface SimulationFormData {
  traffic_intensity?: number;
  channels?: number;
  blocking_prob?: number;
  [key: string]: any; // Pour les autres propriétés non définies
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface Simulation {
  id: string;
  type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
  name?: string;
  description?: string;
  status?: 'completed' | 'running' | 'error';
  result: number;
  formData: SimulationFormData;
  chartData?: any;
  aiAnalysis?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: User; // Ajout des informations de l'utilisateur propriétaire
  zoneDisplayName?: string;
  zoneLat?: number;
  zoneLon?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useSimulations = (params: PaginationParams = {}) => {
  return useQuery<PaginatedResponse<Simulation>, Error>({
    queryKey: ['simulations', params],
    queryFn: () => simulationService.getSimulations(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ simulationId, isFavorite }: { simulationId: string; isFavorite: boolean }) => {
      // Invalider le cache pour forcer un rechargement avec les dernières données
      await queryClient.invalidateQueries({ queryKey: ['simulations'] });
      return simulationService.toggleFavorite(simulationId, isFavorite);
    },
    onMutate: async ({ simulationId, isFavorite }) => {
      // Annuler les requêtes en cours pour éviter les conflits
      await queryClient.cancelQueries({ queryKey: ['simulations'] });
      
      // Sauvegarder l'état précédent pour pouvoir le restaurer en cas d'erreur
      const previousSimulations = queryClient.getQueryData(['simulations']);
      
      // Mettre à jour l'état local immédiatement pour un retour visuel instantané
      queryClient.setQueryData(
        ['simulations'],
        (old: { data: Simulation[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map(simulation => 
              simulation.id === simulationId 
                ? { ...simulation, isFavorite: !simulation.isFavorite } 
                : simulation
            )
          };
        }
      );
      
      return { previousSimulations };
    },
    onSuccess: (data, { isFavorite }) => {
      // Invalider et recharger les données après un court délai
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['simulations'] });
      }, 300);
      
      // Afficher une notification de succès
      if (isFavorite) {
        notify.success('Favori ajouté', {
          description: 'La simulation a été ajoutée à vos favoris.'
        });
      } else {
        notify.success('Favori retiré', {
          description: 'La simulation a été retirée de vos favoris.'
        });
      }
    },
    onError: (error, { simulationId, isFavorite }, context) => {
      // En cas d'erreur, restaurer l'état précédent
      if (context?.previousSimulations) {
        queryClient.setQueryData(['simulations'], context.previousSimulations);
      }
      
      // Afficher une notification d'erreur
      notify.error('Erreur', {
        description: error.message || 'Une erreur est survenue lors de la mise à jour des favoris.'
      });
    },
    onSettled: () => {
      // Toujours invalider les requêtes après un certain temps pour s'assurer que l'état est à jour
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['simulations'] });
      }, 1000);
    }
  });
};

export const useDeleteSimulation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (simulationId: string) => 
      simulationService.deleteSimulation(simulationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};

// Helper function to get simulation type display name and color
export const getSimulationTypeInfo = (type: string) => {
  switch (type) {
    case 'CHANNELS':
      return {
        name: 'Canaux',
        color: 'text-blue-500 fill-blue-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        borderColor: 'border-blue-300 dark:border-blue-700',
      };
    case 'BLOCKING':
      return {
        name: 'Blocage',
        color: 'text-purple-500 fill-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        borderColor: 'border-purple-300 dark:border-purple-700',
      };
    case 'TRAFFIC':
      return {
        name: 'Trafic',
        color: 'text-green-500 fill-green-500',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        borderColor: 'border-green-300 dark:border-green-700',
      };
    case 'POPULATION':
      return {
        name: 'Population',
        color: 'text-amber-500 fill-amber-500',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        borderColor: 'border-amber-300 dark:border-amber-700',
      };
    default:
      return {
        name: 'Inconnu',
        color: 'text-gray-500 fill-gray-500',
        bgColor: 'bg-gray-100 dark:bg-gray-900/30',
        borderColor: 'border-gray-300 dark:border-gray-700',
      };
  }
};
