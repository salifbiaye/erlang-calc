'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import type { AuthState } from '@/store/auth.store';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const login = useAuthStore((state: AuthState) => state.login);

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        // Store in Zustand store
        login(token, user);
        
        // Invalidate any existing auth queries
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        
        // Redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to parse user data:', error);
        router.push('/login?error=auth_failed');
      }
    } else {
      // Handle error case
      router.push('/login?error=auth_failed');
    }
  }, [searchParams, router, queryClient, login]);

  return (
    <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-semibold mb-2">Authenticating...</h1>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
} 