'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

async function requestPasswordReset(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to request password reset');
  }

  return response.json();
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      setEmail('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
            <p className="text-green-600 dark:text-green-400 text-center">
              If an account exists with this email, you will receive password reset instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>

            {isError && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-center">
                  An error occurred. Please try again later.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 