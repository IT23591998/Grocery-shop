import { createClient } from '@/libs/supabaseServer';
import ProductForm from '@/components/admin/ProductForm';

async function getProduct(id: string) {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    return data;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Product: {product.name}</h1>
            <ProductForm product={product} />
        </div>
    );
}
