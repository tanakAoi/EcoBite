<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function showOrder(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->get();
        return Inertia::render('Customer/OrderHistory', [
            'orders' => $orders,
        ]);
    }
}
