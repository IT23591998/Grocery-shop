import Link from 'next/link';
import { Package, LayoutDashboard, Settings, LogOut, Tags } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-40">
                <div className="p-6">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                        <img src="/logo.jpeg" className="h-8" alt="Kevin's Shop Logo" />
                    </Link>
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Admin Panel</h2>
                    <nav className="space-y-1">
                        <Link href="/admin" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                            <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                            Dashboard
                        </Link>
                        <Link href="/admin/orders" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                            <Package className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                            Orders
                        </Link>
                        <Link href="/admin/products" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                            <Package className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                            Products
                        </Link>
                        <Link href="/admin/categories" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                            <Tags className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                            Categories
                        </Link>
                        <Link href="/admin/settings" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                            <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg group">
                        <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
