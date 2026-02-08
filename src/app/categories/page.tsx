import Link from 'next/link';
import { supabase } from '@/libs/supabaseClient';
import { Category } from '@/types';

// Demo data for categories if DB is empty or in demo mode
const DEMO_CATEGORIES: Category[] = [
    { id: 1, name: "Fruits & Vegetables" },
    { id: 2, name: "Dairy & Eggs" },
    { id: 3, name: "Bakery" },
    { id: 4, name: "Beverages" },
    { id: 5, name: "Snacks" },
];

async function getCategories() {
    if (!supabase) return DEMO_CATEGORIES;

    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error || !data || data.length === 0) {
            console.log("No categories found or error, using demo data");
            return DEMO_CATEGORIES;
        }

        return data as Category[];
    } catch (e) {
        console.error("Error fetching categories:", e);
        return DEMO_CATEGORIES;
    }
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="pt-24 px-4 mx-auto max-w-screen-xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Browse fresh {category.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
