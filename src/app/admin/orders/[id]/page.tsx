import { createClient } from '@/libs/supabaseServer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect'; // Client component for updating status

export const revalidate = 0;

async function getOrder(id: string) {
    const supabase = await createClient();
    if (!supabase) return null;

    // Fetch order
    const { data: order } = await supabase.from('orders').select('*').eq('id', id).single();
    if (!order) return null;

    // Fetch items
    const { data: items } = await supabase.from('order_items').select('*, products(name, image_url)').eq('order_id', id);

    return { ...order, items };
}

export default async function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) return <div>Order not found</div>;

    return (
        <div>
            <div className="flex items-center mb-6">
                <Link href="/admin/orders" className="mr-4 text-gray-500 hover:text-gray-900"><ArrowLeft className="w-6 h-6" /></Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order #{order.id}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Items</h2>
                    <ul className="space-y-4">
                        {order.items.map((item: any) => (
                            <li key={item.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center space-x-4">
                                    {item.products?.image_url && <img src={item.products.image_url} alt={item.products.name} className="w-12 h-12 rounded object-cover" />}
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.products?.name || "Deleted Product"}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity} x Rs. {item.price_at_time}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">Rs. {item.quantity * item.price_at_time}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-xl font-bold text-blue-600">Rs. {order.total_amount}</span>
                    </div>
                </div>

                {/* Customer Details & Actions */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Status</h2>
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customer Details</h2>
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Name</p>
                                <p>{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                                <p>{order.customer_phone}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                                <p>{order.customer_email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Address</p>
                                <p className="whitespace-pre-wrap">{order.customer_address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
