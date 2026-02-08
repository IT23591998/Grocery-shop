import { createClient } from '@/libs/supabaseServer';
import { Product } from '@/types';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const revalidate = 0; // Ensure fresh data on every request

async function getProducts() {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('id', { ascending: true });

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }
    return data;
}

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                <Link href="/admin/products/new" className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">No products found.</td>
                            </tr>
                        ) : (
                            products.map((product: any) => (
                                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center space-x-3">
                                            {product.image_url && <img className="w-8 h-8 rounded-full object-cover" src={product.image_url} alt={product.name} />}
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product.categories?.name || `ID: ${product.category_id}`}</td>
                                    <td className="px-6 py-4">Rs. {product.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            {/* Delete button would go here - implemented as client component or form action */}
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
