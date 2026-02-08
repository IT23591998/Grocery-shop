import { Product } from "@/types";

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Anchor Rathi 400g",
        price: 1150,
        image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800", // Milk/Dairy placeholder
        category_id: 2, // Dairy & Eggs
        description: "Full cream milk powder, 400g pack."
    },
    {
        id: 2,
        name: "Seiviet packet",
        price: 90,
        image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=800", // Snacks placeholder
        category_id: 5, // Snacks
        description: "Crunchy savory snack packet."
    },
    {
        id: 3,
        name: "Egg",
        price: 35,
        image_url: "https://images.unsplash.com/photo-1506976785307-8d3d2a1aac6e?auto=format&fit=crop&q=80&w=800",
        category_id: 2, // Dairy & Eggs
        description: "Fresh farm eggs."
    },
    {
        id: 4,
        name: "Lava cake",
        price: 180,
        image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800", // Cake placeholder
        category_id: 3, // Bakery
        description: "Rich chocolate lava cake."
    },
    {
        id: 5,
        name: "Kava chai",
        price: 120,
        image_url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800", // Tea placeholder
        category_id: 4, // Beverages
        description: "Premium tea blend."
    },
    {
        id: 6,
        name: "Potato",
        price: 200,
        image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
        category_id: 1, // Fruits & Vegetables
        description: "Fresh locally grown potatoes."
    },
    {
        id: 7,
        name: "Pepsi 2 l",
        price: 500,
        image_url: "https://images.unsplash.com/photo-1629203850473-a833829d1f97?auto=format&fit=crop&q=80&w=800", // Soda placeholder
        category_id: 4, // Beverages
        description: "2 Liter Pepsi bottle."
    },
    {
        id: 8,
        name: "Anchor newdel",
        price: 65,
        image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800", // Noodles placeholder
        category_id: 5, // Snacks/Groceries
        description: "Instant noodles pack."
    }
];

// Mark some as featured for Deals page
export const FEATURED_PRODUCTS_IDS = [1, 4, 7]; // Anchor Rathi, Lava cake, Pepsi
