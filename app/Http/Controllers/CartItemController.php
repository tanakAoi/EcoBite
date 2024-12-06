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
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if (!$request->user()) {
            $cart = Cart::firstOrCreate([
                'session_id' => session()->getId(),
                'status' => 'pending',
            ]);
        } else {
            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
                'status' => 'pending',
            ]);
        }

        $product = Product::find($request->product_id);

        $item = $cart->items()->where('product_id', $request->product_id)->first();
        if ($item) {
            $item->quantity += $request->quantity;
            $item->item_price = $product->price;
            $item->save();
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'item_price' => $product->price,
            ]);
        }

        $cart->updateTotalPrice();

        return response()->json($item, 201);
    }

    public function removeItem(Request $request)
    {
        $cartItem = CartItem::with('product')
            ->where('id', $request->cartItemId)->first();

        if ($cartItem) {
            $cartItem->delete();

            $cart = Cart::find($cartItem->cart_id);
            $totalPrice = $cart->updateTotalPrice();

            return response()->json([$totalPrice], 200);
        }

        return response()->json(['message' => 'Item not found in cart'], 404);
    }

    public function updateQuantity(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::with('product')
            ->where('id', $request->cartItemId)
            ->first();

        if ($cartItem) {
            $cartItem->quantity = $validated['quantity'];
            $cartItem->save();

            $cart = Cart::find($cartItem->cart_id);
            $totalPrice = $cart->updateTotalPrice();

            return response()->json([$cartItem, $totalPrice], 200);
        }

        return response()->json(['message' => 'Item not found in cart'], 404);
    }
}
