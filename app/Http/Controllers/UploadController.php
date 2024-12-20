<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240', // max 10MB
            'category' => 'required|in:products,recipes', 
        ]);

        $category = $request->input('category');
        $directory = $category === 'recipes' ? 'recipes' : 'products';

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store($directory, 's3', 'public');
            $imageUrl = Storage::disk('s3')->url($imagePath);
        } else {
            $imageUrl = null;
        }

        return response()->json([
            'url' => $imageUrl
        ]);
    }
}