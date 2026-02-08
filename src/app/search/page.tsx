import { supabase } from '@/libs/supabaseClient';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';

import { PRODUCTS } from '@/data/products';

async function searchProducts(query: string) {
    if (!query) return [];

    if (!supabase) {
        return PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${query}%`); // Simple case-insensitive search

        if (error) throw error;

        // Fallback for demo
        if (data.length === 0) {
            return PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        }

        return data as Product[];
    } catch (e) {
        console.error("Error searching products:", e);
        return [];
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    const query = q || '';
    const products = await searchProducts(query);

    return (
        <div className="pt-24 px-4 mx-auto max-w-screen-xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Search Results for "{query}"</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found matching your search.</p>
            ) : (
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="relative h-48 w-full bg-gray-200 rounded-t-lg overflow-hidden">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                            </div>
                            <div className="px-5 pb-5 pt-4">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{product.name}</h5>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
