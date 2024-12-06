import { Cart } from "@/types";
import React, { useState, useEffect } from "react";

interface CartProps {
    cart: Cart;
}

const CartContent: React.FC<CartProps> = ({ cart }) => {
    return (
        <div className="">
            <h2>Cart</h2>

            {cart.items && cart.items.length > 0 ? (
                <div>
                    <ul>
                        {cart.items.map((item) => (
                            <li key={item.id}>
                                <div>{item.product.name}</div>
                                <div>Quantity: {item.quantity}</div>
                                <div>Price: ${item.product.price}</div>
                            </li>
                        ))}
                    </ul>
                    <p>Total: {cart.total_price}</p>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartContent;
