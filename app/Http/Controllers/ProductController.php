<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::paginate(12);
        return Inertia::render('Product/ProductList', ['productsData' => $products]);
    }

    public function getProducts()
    {
        $products = Product::all(['id', 'name']);
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return Inertia::render('Product/ProductSingle', ['product' => $product]);
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
