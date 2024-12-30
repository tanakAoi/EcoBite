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
    currency: string;
    created_at: string;
    updated_at: string;
}

export interface RecipeIngredient {
    id: number;
    name: string;
    product_id: number | null;
    recipe_id: number;
    quantity: number;
    unit: string;
/*     pivot: RecipeIngredientPivot; */
    product: Product;
}

/* export interface RecipeIngredientPivot {
    name: string;
    recipe_id: number;
    product_id: number;
    quantity: number;
    unit: string;
    product?: Product;
} */

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

export interface Order {
    id: number;
    user_id: number;
    total_price: number;
    order_status: string;
    created_at: string;
    updated_at: string;
    items: Array<OrderItem>;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: string;
}

export interface OrderDetails {
    id: number;
    order_status: string;
    total_price: number;
    user?: User;
    items: Array<OrderItem>;
    created_at: string;
    updated_at: string;
}
export interface PaginatedRecipes {
    data: Recipe[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}