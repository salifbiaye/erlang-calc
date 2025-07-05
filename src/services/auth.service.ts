import { useAuthStore } from '@/store/auth.store';
import { useMutation, useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  },


  register: async (data: RegisterData) => {

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'inscription');
    }

    return response.json();
  },

  verifyEmail: async (token: string) => {
    const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la vérification de l\'email');
    }

    return response.json();
  },

  forgotPassword: async (email: string) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation');
    }

    return response.json();
  },

  resetPassword: async ({ token, password }: { token: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la réinitialisation du mot de passe');
    }

    return response.json();
  },

  getCurrentUser: async () => {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error('Aucun token trouvé');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la récupération du profil');
    }

    return response.json();
  },
};

// React Query Hooks
export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.access_token, data.user);
    },
  });
};


export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};

export const useVerifyEmail = (token: string) => {
  return useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: () => authService.verifyEmail(token),
    enabled: !!token,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
};

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUser = useAuthStore((state) => state.updateUser);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      updateUser(data);
    },
  });
}; 