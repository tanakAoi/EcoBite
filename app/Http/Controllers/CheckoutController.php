<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Checkout');
    }

    public function createPaymentIntent(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $customer = $stripe->customers->search([
            'query' => 'email:\'' . $request->email . '\'',
        ]);

        if (count($customer->data) > 0) {
            $customerId = $customer->data[0]->id;
        } else {
            $customer = $stripe->customers->create([
                'email' => $request->email,
            ]);
            $customerId = $customer->id;
        }

        $intent = $stripe->paymentIntents->create([
            'customer' => $customerId,
            'amount' => $request->totalPrice * 100,
            'currency' => 'sek',
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        $returnUrl = config('app.url') . 'checkout/order-confirmation';

        return response()->json([
            'client_secret' => $intent->client_secret, 
            'return_url' => $returnUrl
        ]);
    }

    public function confirm()
    {
        return Inertia::render('OrderConfirmation');
    }
}
