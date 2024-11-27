<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/ProductList', []);
    }

    public function show($id)
    {
        return Inertia::render('Product/ProductSingle', []);
    }
}
