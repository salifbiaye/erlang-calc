
import {useAuthStore} from "@/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface SimulationStat {
  type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
  count: number;
}

export interface SimulationStatsResponse {
  success: boolean;
  data: SimulationStat[];
}

export const dashboardService = {
  getSimulationStats: async (): Promise<SimulationStatsResponse> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${API_URL}/simulations/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })

        },
        });
    if (!response.ok) {
        throw new Error(`Error fetching simulation stats: ${response.statusText}`);

    }

    const data = await response.json();
    return {
      success: true,
      data: data as SimulationStat[],
    };
    }
};

export default dashboardService;
