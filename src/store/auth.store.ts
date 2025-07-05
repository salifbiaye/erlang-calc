import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name?: string;
  image: string | null;
  emailVerified: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        // Set the auth token cookie with a 7-day expiry
        Cookies.set('auth-token', token, { expires: 7, sameSite: 'strict' });
        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        // Remove the auth token cookie
        Cookies.remove('auth-token');
        set({ token: null, user: null, isAuthenticated: false });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (typeof window !== 'undefined') {
          const cookieToken = Cookies.get('auth-token');
          // Si pas de cookie mais un token dans le store, on nettoie
          if (!cookieToken && state?.token) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      }
    }
  )
); 