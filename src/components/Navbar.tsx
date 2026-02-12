"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const { cartCount } = useCart();

    // Hide navbar on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.jpeg" className="h-8" alt="Kevin's Shop Logo" />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="search"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {/* Mobile Search Icon (toggles search bar - simplified for now just redirect to search page) */}
                    <button onClick={() => router.push('/search')} type="button" className="md:hidden text-white hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                        <Search className="w-5 h-5" />
                        <span className="sr-only">Search</span>
                    </button>

                    <Link href="/cart" className="text-white hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center relative">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">{cartCount}</div>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white bg-gray-800 md:bg-transparent">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/categories" className="block py-2 px-3 text-white rounded hover:bg-gray-100/10 md:hover:bg-transparent md:hover:text-blue-500 md:p-0">Categories</Link>
                        </li>
                        <li>
                            <Link href="/deals" className="block py-2 px-3 text-white rounded hover:bg-gray-100/10 md:hover:bg-transparent md:hover:text-blue-500 md:p-0">Deals</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
