// src/services/settings.service.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  name: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const settingsService = {
  // Récupérer le profil utilisateur
  getUserProfile: async (): Promise<UserProfile> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération du profil');
    }

    return response.json();
  },

  // Mettre à jour le profil utilisateur
  updateProfile: async (data: UpdateUserDto): Promise<UserProfile> => {
    try {
      const authStore = useAuthStore.getState();
      const token = authStore.token;
      
      if (!token) {
        throw new Error('Non authentifié');
      }

      console.log('Updating profile with data:', data);

      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Échec de la mise à jour du profil');
      }

      const updatedUser = await response.json();
      
      // Mettre à jour le store d'authentification avec les nouvelles données utilisateur
      if (authStore.user) {
        authStore.updateUser({
          ...authStore.user,
          ...updatedUser
        });
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Changer le mot de passe
  changePassword: async (data: ChangePasswordDto): Promise<{ message: string }> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_URL}/users/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors du changement de mot de passe');
    }

    return response.json();
  },

  // Supprimer le compte utilisateur
  deleteAccount: async (): Promise<{ success: boolean; message: string }> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la suppression du compte');
    }

    return response.json();
  },
};

// Hook React Query pour le profil utilisateur
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: settingsService.getUserProfile,
  });
};

// Hook pour la mise à jour du profil
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: settingsService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

// Hook pour le changement de mot de passe
export const useChangePassword = () => {
  return useMutation({
    mutationFn: settingsService.changePassword,
  });
};

// Hook pour la suppression du compte
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: settingsService.deleteAccount,
  });
};
