import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <div className="absolute inset-0 z-0">
                {/* We can add a real image later via Image component */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 blur-sm transform scale-105"></div>
            </div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
                    Fresh Groceries Delivered to Your Doorstep
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                    Experience the finest selection of organic produce, daily essentials, and gourmet treats.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <Link href="#products" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-transform hover:scale-105">
                        Shop Now
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <Link href="#" className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100/20 focus:ring-4 focus:ring-gray-400 backdrop-blur-sm transition-colors">
                        View Categories
                    </Link>
                </div>
            </div>
        </section>
    );
}
