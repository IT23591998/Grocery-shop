import { createClient } from '@/libs/supabaseServer';
import CategoryForm from '@/components/admin/CategoryForm';

async function getCategory(id: string) {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data } = await supabase.from('categories').select('*').eq('id', id).single();
    return data;
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await getCategory(id);

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Category: {category.name}</h1>
            <CategoryForm category={category} />
        </div>
    );
}
