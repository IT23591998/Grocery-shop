import { supabase } from '@/libs/supabaseClient';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';

export const revalidate = 0; // Ensure fresh data

async function getCategories() {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
    return data;
}

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                <Link href="/admin/categories/new" className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-3xl">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center">No categories found.</td>
                            </tr>
                        ) : (
                            categories.map((category: any) => (
                                <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{category.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link href={`/admin/categories/${category.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
