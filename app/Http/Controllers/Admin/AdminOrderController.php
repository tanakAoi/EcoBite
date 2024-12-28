<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

    public function edit($id)
    {
        $order = Order::with('items.product')->with('user')->findOrFail($id);

        return Inertia::render('Admin/OrderUpdate', [
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
        
        session()->flash('type', 'success');
        session()->flash('message', 'Order updated successfully!');

        return redirect()->route('admin.order.index');
    }
}
