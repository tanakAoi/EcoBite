<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShopSetting;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;

class ShopSettingController extends Controller
{
    public function index()
    {
        $shopSetting = ShopSetting::first();

        return Inertia::render('Admin/ShopSettings', [
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
}
