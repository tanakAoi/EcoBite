<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

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
        return Inertia::render('Admin/ProductCreate');
    }

    public function store(Request $request)
    {
        Log::info($request->all());

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

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/ProductShow', [
            'product' => $product
        ]);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/ProductEdit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product->update($validatedData);

        return redirect()
            ->route('admin.product.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('s3')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.product.index')->with('success', 'Product deleted successfully!');
    }
}
