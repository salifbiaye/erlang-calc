
import { useAuthStore } from "@/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface CreateSimulationDto {
  type: 'channels' | 'blocking' | 'traffic' | 'population';
  formData: Record<string, any>;
  result: number;
  chartData: Record<string, any>;
  aiAnalysis?: string | null;
  zone?: {
    lat: number;
    lon: number;
    display_name: string;
  } | null;
}

export interface Simulation {
  id: string;
  userId: string;
  zoneLat: number;
  zoneLon: number;
  zoneDisplayName: string;
  type: 'channels' | 'blocking' | 'traffic' | 'population';
  formData: Record<string, any>;
  result: number;
  chartData: Record<string, any>;
  aiAnalysis: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  favoritesOnly?: boolean;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Fonction utilitaire pour télécharger un fichier
export const downloadFile = (data: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

export const simulationService = {
  getSimulations: async (params?: PaginationParams): Promise<PaginatedResponse<Simulation>> => {
    const token = useAuthStore.getState().token;
    
    // Construire l'URL avec les paramètres de requête
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.favoritesOnly) queryParams.append('favoritesOnly', 'true');
      if (params.search) queryParams.append('search', params.search);
    }
    
    const url = `${API_URL}/simulations?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },

    });
    console.log(`Fetching simulations from: ${url}`)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec du chargement des simulations');
    }

    const data = await response.json();
    return {
      data: data.data,
      pagination: {
        total: data.pagination.total,
        page: data.pagination.page,
        limit: data.pagination.limit,
        totalPages: data.pagination.totalPages
      }
    };
  },

  toggleFavorite: async (simulationId: string, isFavorite: boolean): Promise<Simulation> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${API_URL}/simulations/${simulationId}?favorite=${isFavorite}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },

    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec de la modification du favori');
    }

    return response.json();
  },

  getSimulationById: async (id: string): Promise<Simulation> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${API_URL}/simulations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },

    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec de la récupération de la simulation');
    }

    return response.json();
  },

  deleteSimulation: async (simulationId: string): Promise<{ success: boolean }> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${API_URL}/simulations/${simulationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },

    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec de la suppression de la simulation');
    }

    return { success: true };
  },

  exportSimulationToPdf(simulationId: string, filename: string = 'simulation.pdf'): Promise<void> {
    const token = useAuthStore.getState().token;
    return fetch(`${API_URL}/simulations/${simulationId}/export/pdf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },

    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Échec de l\'export PDF');
      }
      return response.blob();
    })
    .then(blob => {
      downloadFile(blob, filename);
    });
  },
  
  createSimulation: async (data: CreateSimulationDto): Promise<Simulation> => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${API_URL}/simulations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec de la création de la simulation');
    }

    return response.json();
  }
};

export default simulationService;
