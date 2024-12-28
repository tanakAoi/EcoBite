<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
            'stock_quantity' => 'integer',
            'image_url' => 'nullable|string|url',
        ]);

        Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock_quantity' => $request->input('stock_quantity'),
            'image' => $request->input('image_url'),
        ]);

        session()->flash('type', 'success');
        session()->flash('message', 'Product saved successfully!');

        return redirect()->route('admin.product.index');
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
        Log::info($request->all());

        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'stock_quantity' => 'integer|min:0',
            'image_url' => 'nullable|string|url',
        ]);

        $product->update([
        'name' => $request->name,
        'description' => $request->description,
        'price' => $request->price,
        'stock_quantity' => $request->stock_quantity,
        'image' => $request->image_url,
    ]);

        session()->flash('type', 'success');
        session()->flash('message', 'Product updated successfully!');

        return redirect()->route('admin.product.index');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('s3')->delete($product->image);
        }

        $product->delete();

        session()->flash('type', 'success');
        session()->flash('message', 'Product deleted successfully!');

        return redirect()->route('admin.product.index');
    }
}
