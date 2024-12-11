<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::paginate(10);

        return Inertia::render('Admin/OrderList', [
            'ordersData' => $orders
        ]);
    }

    public function show($id)
    {
        $order = Order::with('items.product')->with('user')->find($id);

        return Inertia::render('Admin/OrderShow', [
            'order' => $order
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'order_status' => 'required|string',
        ]);

        $order = Order::find($id);

        $order->order_status = $request->input('order_status');
        $order->save();

        return redirect()->route('admin.order.index')->with('success', 'Order updated successfully!');
    }
}
