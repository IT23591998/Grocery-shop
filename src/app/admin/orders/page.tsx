import { supabase } from '@/libs/supabaseClient';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export const revalidate = 0;

async function getOrders() {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
    return data;
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Orders</h1>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order: any) => (
                                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">#{order.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.customer_name}
                                        <div className="text-xs text-gray-500">{order.customer_phone}</div>
                                    </td>
                                    <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">Rs. {order.total_amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase
                                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : ''}
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                                            ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline inline-flex items-center">
                                            <Eye className="w-4 h-4 mr-1" /> View
                                        </Link>
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
