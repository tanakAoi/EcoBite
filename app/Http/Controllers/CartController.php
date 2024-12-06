<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Inertia\Inertia;

class CartController extends Controller
{
    public function showCart(Request $request)
    {
        if ($request->user()) {
            $cart = Cart::with('items.product')
            ->where('user_id', $request->user()->id)
                ->firstOrCreate(['status' => 'pending']);
        } else {
            $cart = Cart::with('items.product')
            ->where('session_id', session()->getId())
                ->firstOrCreate(['status' => 'pending']);
        }

        return Inertia::render('Cart', ['cart' => $cart]);
    }

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

    public function updateItem(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::where('id', $id)->firstOrFail();
        $item->update(['quantity' => $request->quantity]);

        return response()->json($item);
    }

    public function removeItem($id)
    {
        $item = CartItem::where('id', $id)->firstOrFail();
        $item->delete();

        return response()->json(['message' => 'Item removed']);
    }
}
