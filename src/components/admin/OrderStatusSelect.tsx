"use client";

import { useState } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: number, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        if (!supabase) return;

        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;
            router.refresh();
        } catch (error: any) {
            alert("Error updating status: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <select
            value={status}
            onChange={handleStatusChange}
            disabled={loading}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
        </select>
    );
}
