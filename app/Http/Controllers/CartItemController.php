<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;

class CartItemController extends Controller
{
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::find($validated['cart_id']);
        $product = Product::find($validated['product_id']);

        $existingCartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($existingCartItem) {
            $existingCartItem->quantity += $validated['quantity'];
            $existingCartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'item_price' => $product->price,
            ]);
        }

        return response()->json(['message' => 'Item added to cart'], 200);
    }

    public function removeItem($cartId, $productId)
    {
        $cartItem = CartItem::where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Item removed from cart'], 200);
        }

        return response()->json(['message' => 'Item not found in cart'], 404);
    }

    public function updateQuantity(Request $request, $cartId, $productId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $cartItem->quantity = $validated['quantity'];
            $cartItem->save();
            return response()->json(['message' => 'Item quantity updated'], 200);
        }

        return response()->json(['message' => 'Item not found in cart'], 404);
    }
}
