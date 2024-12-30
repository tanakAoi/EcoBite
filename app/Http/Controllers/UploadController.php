<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        try {
            Log::info($request->all());
            
            $request->validate([
                'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240', // max 10MB
                'category' => 'required|in:products,recipes,other',
            ]);

            $category = $request->input('category');
            $directory = $category === 'recipes' ? 'recipes' : ($category === 'products' ? 'products' : 'other');

            $file = $request->file('image');
            $hash = md5_file($file->getRealPath());
            $existingFilePath = "{$directory}/{$hash}.{$file->getClientOriginalExtension()}";

            if (Storage::disk('s3')->exists($existingFilePath)) {
                $imageUrl = Storage::disk('s3')->url($existingFilePath);
            } else {
                $imagePath = $file->storeAs($directory, "{$hash}.{$file->getClientOriginalExtension()}", 's3');
                $imageUrl = Storage::disk('s3')->url($imagePath);
            }

            return response()->json([
                'url' => $imageUrl
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
