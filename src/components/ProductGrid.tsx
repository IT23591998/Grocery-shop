import { supabase } from '@/libs/supabaseClient';
import Image from 'next/image';

// We'd ideally move this to a types file
interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string | null;
    category_id: number;
}

const DEMO_PRODUCTS: Product[] = [
    { id: 1, name: "Fresh Apples", price: 2.99, image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800", category_id: 1 },
    { id: 2, name: "Organic Bananas", price: 1.49, image_url: "https://images.unsplash.com/photo-1603833665858-e61d17a86271?auto=format&fit=crop&q=80&w=800", category_id: 1 },
    { id: 3, name: "Whole Milk", price: 3.50, image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800", category_id: 2 },
    { id: 4, name: "Sourdough Bread", price: 4.99, image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", category_id: 3 },
    { id: 5, name: "Eggs (Dozen)", price: 5.25, image_url: "https://images.unsplash.com/photo-1506976785307-8d3d2a1aac6e?auto=format&fit=crop&q=80&w=800", category_id: 2 },
];

async function getProducts() {
    // Return demo data immediately since we are in demo mode
    if (!supabase) {
        console.log("Demo Mode: Serving static data");
        return DEMO_PRODUCTS;
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .limit(10);

        if (error) {
            console.error("Error fetching products:", error);
            return DEMO_PRODUCTS; // Fallback to demo data on error
        }
        return data as Product[];
    } catch (e) {
        console.error("Unexpected error:", e);
        return DEMO_PRODUCTS;
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
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
