"use client";

import { useState } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!supabase) {
            setError("Supabase client not initialized.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Successful login
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                    <img src="/logo.jpeg" className="h-12 mx-auto mb-4" alt="Kevin's Shop Logo" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to manage your store</p>
                </div>

                {error && (
                    <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error:</span> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                        Don't have an account? Ask the owner to invite you.
                    </div>
                </form>
            </div>
        </div>
    );
}
