import { createClient } from '@/libs/supabaseServer';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

import { Product } from '@/types';

async function getProducts() {
    const supabase = await createClient();

    // If client setup failed, return empty array
    if (!supabase) {
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .limit(10);

        if (error) {
            console.error("Error fetching products:", error);
            return [];
        }
        return data as Product[];
    } catch (e) {
        console.error("Unexpected error:", e);
        return [];
    }
}

export default async function ProductGrid() {
    const products = await getProducts();

    return (
        <section id="products" className="py-16 px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white text-center">Featured Products</h2>

            {products.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>No products found. Add some products to your Supabase database!</p>
                </div>
            ) : (
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 w-full bg-gray-200 rounded-t-lg overflow-hidden">
                                {/* Placeholder image logic if no URL provided */}
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="px-5 pb-5 pt-4">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{product.name}</h5>
                                </a>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs. {product.price}</span>
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
