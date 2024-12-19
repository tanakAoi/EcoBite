<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

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
}
