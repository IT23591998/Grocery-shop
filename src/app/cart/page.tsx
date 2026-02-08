"use client";

import { useCart } from "@/context/CartContext";
import Link from 'next/link';

export default function CartPage() {
    const { items, removeFromCart, clearCart, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="pt-24 px-4 mx-auto max-w-screen-xl text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
                <p className="mb-8 text-gray-500">Your cart is empty.</p>
                <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 px-4 mx-auto max-w-screen-xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <div className="flex items-center space-x-3">
                                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded object-cover" />}
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">Rs. {item.price.toFixed(2)}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                                <td className="px-6 py-4">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow dark:bg-gray-800">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Total: Rs. {cartTotal.toFixed(2)}</div>
                <div className="space-x-4">
                    <button
                        onClick={clearCart}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Clear Cart
                    </button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
