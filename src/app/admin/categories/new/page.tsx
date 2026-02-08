import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Category</h1>
            <CategoryForm />
        </div>
    );
}
