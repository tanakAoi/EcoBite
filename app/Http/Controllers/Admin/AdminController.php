<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function updateCurrency(Request $request)
    {
        $request->validate([
            'currency' => 'required|in:SEK,USD,JPY',
        ]);

        session(['shopCurrency' => $request->currency]);

        session()->flash('type', 'success');
        session()->flash('message', 'Shop currency updated successfully!');

        return response()->json(['message' => 'Currency updated']);
    }
}
