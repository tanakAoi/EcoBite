import { User } from "@/types";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    user: User;
    cart: Cart;
    flash: Flash;
};
