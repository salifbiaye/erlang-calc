// src/services/calculate.service.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { notify } from '@/lib/notifications';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CalculateChannelsParams {
  calculationType: 'channels';
  traffic_intensity: number;
  blocking_prob: number;
  selectedZone?: {
    lat: number;
    lon: number;
    display_name: string;
  };
}

interface CalculateBlockingParams {
  calculationType: 'blocking';
  num_channels: number;
  traffic_load: number;
  selectedZone?: {
    lat: number;
    lon: number;
    display_name: string;
  };
}

interface CalculateTrafficParams {
  calculationType: 'traffic';
  available_channels: number;
  target_blocking: number;
  selectedZone?: {
    lat: number;
    lon: number;
    display_name: string;
  };
}

interface CalculatePopulationParams {
  calculationType: 'population';
  population: number;
  call_rate: number;
  avg_duration: number;
  selectedZone?: {
    lat: number;
    lon: number;
    display_name: string;
  };
}

interface ChannelDataPoint {
  channels: number;
  blockingRate: number;
  traffic?: number;
}

interface CalculateResponse {
  result: number;
  chartData: ChannelDataPoint[];
  aiAnalysis: string;
}

export const calculateService = {
  calculateChannels: async (params: CalculateChannelsParams): Promise<CalculateResponse> => {
    const token = useAuthStore.getState().token;
    const loadingId = notify.loading('Calcul en cours...');
    
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du calcul');
      }

      const result = await response.json();
      notify.dismiss(loadingId);
      notify.success('Calcul terminé avec succès', {
        description: 'Les résultats sont disponibles ci-dessous.'
      });
      return result;
    } catch (error) {
      notify.dismiss(loadingId);
      notify.error('Erreur', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors du calcul.'
      });
      throw error;
    }
  },

  calculateBlocking: async (params: CalculateBlockingParams): Promise<CalculateResponse> => {
    const token = useAuthStore.getState().token;
    const loadingId = notify.loading('Calcul en cours...');
    
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du calcul');
      }

      const result = await response.json();
      notify.dismiss(loadingId);
      notify.success('Calcul terminé avec succès', {
        description: 'Les résultats sont disponibles ci-dessous.'
      });
      return result;
    } catch (error) {
      notify.dismiss(loadingId);
      notify.error('Erreur', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors du calcul.'
      });
      throw error;
    }
  },

  calculateTraffic: async (params: CalculateTrafficParams): Promise<CalculateResponse> => {
    const token = useAuthStore.getState().token;
    const loadingId = notify.loading('Calcul du trafic en cours...');
    
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du calcul du trafic');
      }

      const result = await response.json();
      notify.dismiss(loadingId);
      notify.success('Calcul du trafic terminé', {
        description: 'Les résultats sont disponibles ci-dessous.'
      });
      return result;
    } catch (error) {
      notify.dismiss(loadingId);
      notify.error('Erreur', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors du calcul du trafic.'
      });
      throw error;
    }
  },
  
  calculatePopulation: async (params: CalculatePopulationParams): Promise<CalculateResponse> => {
    const token = useAuthStore.getState().token;
    const loadingId = notify.loading('Calcul basé sur la population en cours...');
    
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du calcul basé sur la population');
      }

      const result = await response.json();
      notify.dismiss(loadingId);
      notify.success('Calcul terminé', {
        description: 'Les résultats basés sur la population sont disponibles ci-dessous.'
      });
      return result;
    } catch (error) {
      notify.dismiss(loadingId);
      notify.error('Erreur', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors du calcul basé sur la population.'
      });
      throw error;
    }
  }
};

// Hook React Query pour le calcul des canaux
export const useCalculateChannels = () => {
  const mutation = useMutation({
    mutationFn: (params: CalculateChannelsParams) =>
      calculateService.calculateChannels(params),
  });

  return mutation;
};

export const useCalculateBlocking = () => {
  const mutation = useMutation({
    mutationFn: (params: CalculateBlockingParams) =>
      calculateService.calculateBlocking(params),
  });

  return mutation;
};

export const useCalculateTraffic = () => {
  const mutation = useMutation({
    mutationFn: (params: CalculateTrafficParams) =>
      calculateService.calculateTraffic(params),
  });

  return mutation;
};

export const useCalculatePopulation = () => {
  const mutation = useMutation({
    mutationFn: (params: CalculatePopulationParams) =>
      calculateService.calculatePopulation(params),
  });

  return mutation;
};

// Hook pour obtenir les données du graphique
export const useChartData = (data: any[] | undefined) => {
  return useQuery({
    queryKey: ['chartData', data],
    queryFn: () => {
      if (!data) return { labels: [], datasets: [] };

      // Handle traffic chart data which has a different structure
      if (data.length > 0 && 'traffic' in data[0]) {
        return {
          labels: data.map(item => item.traffic.toFixed(2)),
          datasets: [
            {
              label: 'Taux de blocage (%)',
              data: data.map(item => item.blockingRate * 100),
              borderColor: 'hsl(221.2 83.2% 53.3%)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.3,
              fill: true,
            },
          ],
        };
      }

      // Default handling for channel data
      return {
        labels: data.map(item => item.channels),
        datasets: [
          {
            label: 'Taux de blocage (%)',
            data: data.map(item => item.blockingRate * 100),
            borderColor: 'hsl(221.2 83.2% 53.3%)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      };
    },
  });
};
