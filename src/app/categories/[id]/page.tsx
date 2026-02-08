import { supabase } from '@/libs/supabaseClient';
import { Product, Category } from '@/types';
import ProductGrid from '@/components/ProductGrid'; // We might need to refactor ProductGrid to accept props, or create a new component. For now I'll create a local display.
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

// Demo data - duplicating relevant parts from ProductGrid for now, should ideally be shared
const DEMO_PRODUCTS: Product[] = [
    { id: 1, name: "Fresh Apples", price: 2.99, image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800", category_id: 1 },
    { id: 2, name: "Organic Bananas", price: 1.49, image_url: "https://images.unsplash.com/photo-1603833665858-e61d17a86271?auto=format&fit=crop&q=80&w=800", category_id: 1 },
    { id: 3, name: "Whole Milk", price: 3.50, image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800", category_id: 2 },
    { id: 4, name: "Sourdough Bread", price: 4.99, image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", category_id: 3 },
    { id: 5, name: "Eggs (Dozen)", price: 5.25, image_url: "https://images.unsplash.com/photo-1506976785307-8d3d2a1aac6e?auto=format&fit=crop&q=80&w=800", category_id: 2 },
];

async function getCategoryProducts(categoryId: number) {
    if (!supabase) {
        return DEMO_PRODUCTS.filter(p => p.category_id === categoryId);
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', categoryId);

        if (error) throw error;

        // If DB returns nothing, check if we should show demo data for that category ID (for testing purposes)
        if (data.length === 0) {
            return DEMO_PRODUCTS.filter(p => p.category_id === categoryId);
        }

        return data as Product[];
    } catch (e) {
        console.error("Error fetching products:", e);
        return DEMO_PRODUCTS.filter(p => p.category_id === categoryId);
    }
}

async function getCategoryName(categoryId: number) {
    // Simple lookup for demo purposes or DB fetch
    if (!supabase) {
        const cats = [
            { id: 1, name: "Fruits & Vegetables" },
            { id: 2, name: "Dairy & Eggs" },
            { id: 3, name: "Bakery" },
            { id: 4, name: "Beverages" },
            { id: 5, name: "Snacks" },
        ];
        return cats.find(c => c.id === categoryId)?.name || "Category";
    }

    const { data } = await supabase.from('categories').select('name').eq('id', categoryId).single();
    return data?.name || "Category";
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const categoryId = parseInt(id);
    const products = await getCategoryProducts(categoryId);
    const categoryName = await getCategoryName(categoryId);

    return (
        <div className="pt-24 px-4 mx-auto max-w-screen-xl">
            <div className="mb-4">
                <Link href="/categories" className="text-blue-500 hover:underline">← Back to Categories</Link>
            </div>
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">{categoryName}</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found in this category.</p>
            ) : (
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {/* Reusing card structure - should ideally be a component */}
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
                                    {/* Add to cart will be handled by a client component wrapper or similar mechanism later */}
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
