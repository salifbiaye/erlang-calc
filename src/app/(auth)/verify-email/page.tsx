'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// Composant de chargement
function LoadingSpinner() {
  return (
    <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-semibold mb-2">Verifying Email...</h1>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}

// Composant principal enveloppé dans Suspense
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      return response.json();
    },
    enabled: !!token,
    retry: false
  });

  useEffect(() => {
    if (data) {
      // Redirect after successful verification
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 3000);
    }
  }, [data, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 text-red-500 mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-2 text-red-500">Verification Failed</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The verification link is invalid or has expired.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 text-green-500 mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2 text-green-500">Email Verified!</h1>
        <p className="text-gray-500 dark:text-gray-400">Your email has been successfully verified. Redirecting to login...</p>
      </div>
    </div>
  );
}

// Composant exporté par défaut avec Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailContent />
    </Suspense>
  );
}