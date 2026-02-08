export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    unit_weight?: string;
    image_url: string | null;
    category_id: number;
    is_featured?: boolean;
    in_stock?: boolean;
}


export interface CartItem extends Product {
    quantity: number;
}
