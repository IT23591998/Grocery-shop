"use client";

import { LogOut } from 'lucide-react';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            router.push('/admin/login');
            router.refresh();
        }
    };

    return (
        <button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group transition-colors">
            <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
            Sign Out
        </button>
    );
}
