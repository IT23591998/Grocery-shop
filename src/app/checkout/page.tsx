"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    if (items.length === 0) {
        return (
            <div className="pt-24 px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/" className="text-blue-600 hover:underline">Go back to shopping</Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!supabase) {
            alert("Supabase client not initialized.");
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    customer_name: formData.name,
                    customer_email: formData.email,
                    customer_phone: formData.phone,
                    customer_address: formData.address,
                    total_amount: cartTotal
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_time: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Clear Cart & Redirect
            clearCart();
            router.push(`/checkout/success?orderId=${order.id}`);

        } catch (error: any) {
            console.error("Checkout error:", error);
            alert("Failed to place order: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 px-4 mx-auto max-w-screen-xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-12 h-12">
                                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">Rs. {item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Rs. {cartTotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Details</h2>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email (Optional)</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery Address</label>
                        <textarea name="address" required rows={3} value={formData.address} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={loading} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
                            {loading ? 'Processing Order...' : `Place Order (Rs. ${cartTotal.toFixed(2)})`}
                        </button>
                        <p className="mt-2 text-sm text-center text-gray-500">Cash on Delivery / Payment on Delivery available.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
