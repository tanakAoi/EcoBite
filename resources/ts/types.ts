export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    role: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface RecipeIngredient {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    pivot: RecipeIngredientPivot;
}

export interface RecipeIngredientPivot {
    recipe_id: number;
    product_id: number;
    quantity: number;
    unit: string;
}

export interface Recipe {
    id: number;
    user_id: number;
    title: string;
    ingredients: Array<RecipeIngredient>;
    description: string;
    instructions: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    item_price: number;
    created_at: string;
    updated_at: string;
}
export interface CartItemProduct {
    id: number;
    cart_id: number;
    product_id: number;
    product: Product;
    quantity: number;
    item_price: number;
    created_at: string;
    updated_at: string;
}

export interface Cart {
    id: number;
    user_id?: number;
    session_id?: number;
    total_price?: number;
    status: string;
    created_at: string;
    updated_at: string;
    items?: Array<CartItemProduct>;
}