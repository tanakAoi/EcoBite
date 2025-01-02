<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TranslationService;

class CustomerController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function showOrder(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->get();

        $lang = strtoupper(session('locale', 'en'));

        $orders->map(function ($order) use ($lang) {
            $order->items->map(function ($item) use ($lang) {
                $product = $item->product;

                if ($product) {
                    $cacheKey = "order_product_{$product->id}_{$lang}_name";

                    $translatedProductName = $this->translationService->translateAndCache(
                        $product->name,
                        $cacheKey,
                        $lang,
                        function ($name, $lang) {
                            return $this->translationService->translateText($name, $lang);
                        }
                    );

                    $product->name = $translatedProductName;
                }
            });
        });

        return Inertia::render('Customer/OrderHistory', [
            'orders' => $orders,
        ]);
    }
}
