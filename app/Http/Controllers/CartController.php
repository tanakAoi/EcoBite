<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Database\Eloquent\SoftDeletes;
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

    public function clearCart(Request $request)
    {
        $cart = Cart::where('user_id', $request->input('user_id'))
            ->orWhere('session_id', $request->input('session_id'))
            ->first();

        if ($cart) {
            $cart->items()->delete();
            $cart->delete();
        }

        return response()->json(['message' => 'Cart cleared successfully'], 200);
    }
}
