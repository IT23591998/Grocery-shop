"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProductForm({ product }: { product?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        image_url: product?.image_url || '',
        category_id: product?.category_id || '',
        in_stock: product?.in_stock ?? true,
        is_featured: product?.is_featured ?? false
    });

    useEffect(() => {
        const fetchCategories = async () => {
            if (supabase) {
                const { data } = await supabase.from('categories').select('*').order('name');
                if (data) setCategories(data);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const val = type === 'checkbox' ? e.target.checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
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
            if (product) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', product.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);
                if (error) throw error;
            }
            router.push('/admin/products');
            router.refresh(); // Refresh server components
        } catch (error: any) {
            alert('Error saving product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (Rs.)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select name="category_id" value={formData.category_id} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                    <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="https://..." />
                </div>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                    <input id="in_stock" type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="in_stock" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">In Stock</label>
                </div>
                <div className="flex items-center">
                    <input id="is_featured" type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured (Deals)</label>
                </div>
            </div>

            <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Product'}
            </button>
        </form>
    );
}
