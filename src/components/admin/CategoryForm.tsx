"use client";

import { useState } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function CategoryForm({ category }: { category?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: category?.name || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!supabase) {
            alert("Supabase client not initialized.");
            setLoading(false);
            return;
        }

        try {
            if (category) {
                // Update
                const { error } = await supabase
                    .from('categories')
                    .update(formData)
                    .eq('id', category.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('categories')
                    .insert([formData]);
                if (error) throw error;
            }
            router.push('/admin/categories');
            router.refresh();
        } catch (error: any) {
            alert('Error saving category: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-lg">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
            </div>

            <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Category'}
            </button>
        </form>
    );
}
