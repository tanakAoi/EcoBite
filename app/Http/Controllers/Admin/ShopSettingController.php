<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShopSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ShopSettingController extends Controller
{
    public function index()
    {
        $shopSetting = ShopSetting::first();

        return Inertia::render('Admin/ShopSettings/ShopSettings', [
            'shopSetting' => $shopSetting,
        ]);
    }

    public function updateCurrency(Request $request)
    {
        $request->validate([
            'shop_currency' => 'required|string|size:3',
        ]);

        $shopSetting = ShopSetting::firstOrCreate([]);
        $shopSetting->update(['shop_currency' => $request->shop_currency]);

        Config::set('shop.currency', $request->shop_currency);

        session()->flash('type', 'success');
        session()->flash('message', 'Shop currency updated successfully!');

        return response()->json(['message' => 'SHop currency updated'], 200);
    }

    public function updateHero(Request $request)
    {

        $shopSetting = ShopSetting::firstOrCreate([]);

        $request->validate([
            'tagline' => 'nullable|string',
            'text_color' => 'nullable|string|in:dark,light',
            'image_url' => 'nullable|string|url',
        ]);

        $shopSetting->update([
            'tagline' => $request->filled('tagline') ? $request->tagline : $shopSetting->tagline,
            'text_color' => $request->filled('text_color') ? $request->text_color : $shopSetting->text_color,
            'image' => $request->filled('image_url') ? $request->image_url : $shopSetting->image,
        ]);

        session()->flash('type', 'success');
        session()->flash('message', 'Hero updated successfully!');

        return redirect()->route('admin.settings.index');
    }
}
