<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::paginate(10);

        return Inertia::render('Admin/ProductList', [
            'productsData' => $products
        ]);
    }

    public function create()
    {
        return
            Inertia::render('Admin/ProductCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240', // max 10MB
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 's3', 'public');
            $imageUrl = Storage::disk('s3')->url($imagePath);
        } else {
            $imageUrl = null;
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock_quantity' => $request->input('stock_quantity'),
            'image' => $imageUrl,
        ]);

        return redirect()->route('admin.product.index')->with('success', 'Product created successfully!');;
    }
}
