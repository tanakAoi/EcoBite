
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
    name: string
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