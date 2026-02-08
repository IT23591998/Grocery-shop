import { PRODUCTS } from '@/data/products';
import { Package, Tags, ShoppingCart, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    // In a real app, we would fetch these counts from the database
    const totalProducts = PRODUCTS.length;
    const totalCategories = 5; // Hardcoded from demo categories for now
    const totalOrders = 12; // Dummy data
    const totalRevenue = 4500; // Dummy data

    const stats = [
        { name: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Total Categories', value: totalCategories, icon: Tags, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Total Orders', value: totalOrders, icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Total Revenue', value: `Rs. ${totalRevenue}`, icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Quick Actions Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Products</h2>
                    <ul className="space-y-4">
                        {PRODUCTS.slice(0, 5).map(product => (
                            <li key={product.id} className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {product.image_url ? (
                                        <img className="w-10 h-10 rounded-full object-cover" src={product.image_url} alt={product.name} />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">IMG</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Rs. {product.price}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid gap-4">
                        <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 font-medium transition-colors">
                            + Add New Product
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 font-medium transition-colors">
                            + Add New Category
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 font-medium transition-colors">
                            Manage Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
