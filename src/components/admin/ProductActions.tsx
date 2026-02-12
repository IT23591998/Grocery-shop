"use client";

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/libs/supabaseClient';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
    productId: number;
    productName: string;
}

export default function ProductActions({ productId, productName }: ProductActionsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

        if (!supabase) {
            alert("Supabase client not initialized");
            return;
        }

        try {
            setIsDeleting(true);
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            router.refresh();
        } catch (error: any) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end space-x-2">
            <Link
                href={`/admin/products/${productId}`}
                className="p-2 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-700 transition-colors"
                title="Edit Product"
            >
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                title="Delete Product"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
