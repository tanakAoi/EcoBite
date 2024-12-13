import { User, Cart } from "@/types";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    user: User | null;
    cart: Cart;
    flash: { 
        message: string; 
        type: "success" | "error" | "info" | "warning" 
    };
};
