import { supabase } from '@/libs/supabaseClient';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';

// Demo data - reusing
const DEMO_PRODUCTS: Product[] = [
    { id: 1, name: "Fresh Apples", price: 2.99, image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800", category_id: 1, is_featured: true },
    { id: 2, name: "Organic Bananas", price: 1.49, image_url: "https://images.unsplash.com/photo-1603833665858-e61d17a86271?auto=format&fit=crop&q=80&w=800", category_id: 1, is_featured: true },
    { id: 3, name: "Whole Milk", price: 3.50, image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800", category_id: 2 },
];

async function getFeaturedProducts() {
    if (!supabase) return DEMO_PRODUCTS.filter(p => p.is_featured);

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true);

        if (error || !data || data.length === 0) {
            return DEMO_PRODUCTS.filter(p => p.is_featured);
        }

        return data as Product[];
    } catch (e) {
        console.error("Error fetching deals:", e);
        return DEMO_PRODUCTS.filter(p => p.is_featured);
    }
}

export default async function DealsPage() {
    const products = await getFeaturedProducts();

    return (
        <div className="pt-24 px-4 mx-auto max-w-screen-xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Hot Deals</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No deals available at the moment.</p>
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
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">DEAL</div>
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
