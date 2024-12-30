<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    protected $orderController;

    public function __construct(OrderController $orderController)
    {
        $this->orderController = $orderController;
    }

    public function index(Request $request)
    {
        return Inertia::render('Checkout');
    }

    public function createPaymentIntent(Request $request)
    {
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));

        $order_id = $this->orderController->store($request);

        $customer = $stripe->customers->search([
            'query' => 'email:\'' . $request->email . '\'',
        ]);

        if (count($customer->data) > 0) {
            $customerId = $customer->data[0]->id;
        } else {
            $customer = $stripe->customers->create([
                'email' => $request->email,
                'metadata' => [
                    'user_id' => $request->user_id ?? null,
                    'session_id' => $request->session_id ?? null
                ]
            ]);
            $customerId = $customer->id;
        }

        $intent = $stripe->paymentIntents->create([
            'customer' => $customerId,
            'amount' => $request->total_price * 100,
            'currency' => $request->currency,
            'automatic_payment_methods' => ['enabled' => true],
            'metadata' => [
                'order_id' => $order_id,
            ],
        ]);

        /* $returnUrl = config('app.url') . '/checkout/order-confirmation?order_id=' . $orderId; */
        $returnUrl = route('checkout.confirm', ['order_id' => $order_id]);

        return response()->json([
            'client_secret' => $intent->client_secret,
            'return_url' => $returnUrl,
        ]);
    }

    public function confirm(Request $request)
    {
        $orderId = $request->order_id;
        $order = Order::with('items')->findOrFail($orderId);

        $orderItems = [];
        
        foreach ($order['items'] as $item) {
            $product = Product::find($item['product_id']);

            if (!$product) {
                continue;
            }

            $orderItems[] = (object) [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $item['quantity'],
            ];
        }

        return Inertia::render('OrderConfirmation', [
            'orderId' => $order->id,
            'orderTotalPrice' => $order->total_price,
            'orderItems' => $orderItems,
        ]);
    }
}
