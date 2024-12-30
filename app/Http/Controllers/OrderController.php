<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'session_id' => 'nullable|string',
            'total_price' => 'required|numeric',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'user_id' => $data['user_id'] ?? null,
            'session_id' => $data['session_id'] ?? null,
            'total_price' => $data['total_price'],
            'order_status' => 'pending',
        ]);

        $orderItems = [];

        foreach ($data['items'] as $item) {
            $product = Product::find($item['product_id']);

            if (!$product) {
                continue;
            }

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'total_price' => $product->price * $item['quantity'],
            ]);

            $orderItems[] = (object) [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'quantity' => $item['quantity'],
            ];
        }

        return $order->id;
    }

    public function updateStatus($id)
    {
        $order = Order::findOrFail($id);

        $order->update([
            'order_status' => 'confirmed',
        ]);

        return $order->order_status;
    }
}
