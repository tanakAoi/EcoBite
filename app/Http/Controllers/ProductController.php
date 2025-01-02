<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use App\Services\TranslationService;

class ProductController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function index()
    {
        $products = Product::paginate(12);

        $lang = strtoupper(session('locale', 'en'));

        $translatedProducts = $products->getCollection()->map(function ($product) use ($lang) {

            $cacheKey = "product_{$product->id}_{$lang}_name";

            return $this->translationService->translateAndCache(
                $product,
                $cacheKey,
                $lang,
                function ($product, $lang) {
                    $product->name = $this->translationService->translateText($product->name, $lang);
                    return $product;
                }
            );

            $product->name = $translatedProductName;
        });

        $products->setCollection($translatedProducts);

        return Inertia::render('Product/ProductList', ['productsData' => $products]);
    }

    public function getProducts()
    {
        $products = Product::all(['id', 'name']);

        $lang = strtoupper(session('locale', 'en'));

        $products = $products->map(function ($product) use ($lang) {
            $cacheKey = "form_product_{$product->id}_{$lang}_name";

            $product->name = $this->translationService->translateAndCache(
                $product->name,
                $cacheKey,
                $lang,
                function ($name, $lang) {
                    return $this->translationService->translateText($name, $lang);
                }
            );

            return $product;
        });

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);

        $lang = strtoupper(session('locale', 'en'));

        $cacheKey = "product_{$product->id}_{$lang}";

        $translatedProduct = $this->translationService->translateAndCache(
            $product,
            $cacheKey,
            $lang,
            function ($product, $lang) {
                return $this->translationService->translateSingleproduct($product, $lang);
            }
        );

        return Inertia::render('Product/ProductSingle', ['product' => $translatedProduct]);
    }

    public function updateQuantity($orderItems)
    {
        foreach ($orderItems as $item) {
            $product = Product::find($item->id);
            if ($product && $product->stock_quantity >= $item->quantity) {
                $product->decrement('stock_quantity', $item->quantity);
            } else {
                Log::warning("Product {$product->id} does not have sufficient stock.");
            }
        }
    }
}
