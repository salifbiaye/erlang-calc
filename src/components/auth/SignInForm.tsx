'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/services/auth.service';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: login, isPending, isError } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  };

  return (
    <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please sign in to your account
          </p>
        </div>

        {searchParams.get('verified') === 'true' && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
            <p className="text-green-600 dark:text-green-400 text-center">
              Email verified successfully! You can now sign in.
            </p>
          </div>
        )}

        {searchParams.get('reset') === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
            <p className="text-green-600 dark:text-green-400 text-center">
              Password reset successful! You can now sign in with your new password.
            </p>
          </div>
        )}

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

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>

          {isError && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">
                Invalid email or password
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{' '}
          </span>
          <Link
            href="/register"
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/auth/google')}
              className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src="/images/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
            <button
              onClick={() => router.push('/auth/github')}
              className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src="/images/github.svg"
                alt="GitHub"
                className="w-5 h-5 mr-2"
              />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
