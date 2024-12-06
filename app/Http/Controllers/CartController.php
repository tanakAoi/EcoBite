<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
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

}
