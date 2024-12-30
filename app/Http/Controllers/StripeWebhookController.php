<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserNotificationMail;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;

class StripeWebhookController extends Controller
{
    protected $orderController;
    protected $productController;
    protected $cartController;

    public function __construct(OrderController $orderController, ProductController $productController, CartController $cartController)
    {
        $this->orderController = $orderController;
        $this->productController = $productController;
        $this->cartController = $cartController;
    }

    public function handleWebhook(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        $payload = @file_get_contents('php://input');
        $event = null;

        try {
            $event = \Stripe\Event::constructFrom(
                json_decode($payload, true)
            );
            if ($event->type === 'payment_intent.succeeded') {
                $paymentIntent = $event->data->object;

                $orderId = $paymentIntent->metadata->order_id;

                $order_status = $this->orderController->updateStatus($orderId);

                if ($order_status === 'confirmed') {
                    $customerId = $paymentIntent->customer;
                    $customer = \Stripe\Customer::retrieve($customerId);

                    $userEmail = $customer->email;
                    $userId = $customer->metadata->user_id;

                    if($userId) {
                        $user = User::find($userId);
                    }

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
                            'description' => $product->description,
                            'price' => $product->price,
                            'quantity' => $item['quantity'],
                        ];
                    }
                    
                    Mail::to($userEmail)->send(new UserNotificationMail([
                        'user_email' => $userEmail,
                        'user' => $user,
                        'order' => $order,
                        'items' => $orderItems,
                        'type' => 'order_confirmed',
                    ]));

                    $this->productController->updateQuantity($orderItems);

                   $this->cartController->clearCart($order->user_id, $order->session_id);
                }
            }

            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            Log::error('Webhook error: ' . $e->getMessage());
            return response()->json(['status' => 'failure'], 400);
        }
    }
}
