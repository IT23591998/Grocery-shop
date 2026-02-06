import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] pb-20">
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-10 border-t border-gray-200 dark:border-gray-800 mt-10">
        <p className="text-sm text-gray-500">© 2024 Kevin's Grocery Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
