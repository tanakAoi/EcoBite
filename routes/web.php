<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Recipes
Route::get('/recipes', [RecipeController::class, 'index'])->name('recipe.index');
Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipe.show');
Route::middleware('auth')->group(function () {
    Route::get('/recipe/create', function () {
        return Inertia::render('CreateRecipe');
    });
    Route::post('/recipe/create', 'RecipeController@store');
});

// Products
Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('product.show');

// User
Route::middleware('auth')->group(function () {
    Route::get('/user', function () {
        return Inertia::render('UserDashboard');
    });
    Route::get('/user/profile', function () {
        return Inertia::render('UserProfile');
    });
    Route::get('/user/order-history', function () {
        return Inertia::render('OrderHistory');
    });
    Route::get('/user/account-settings', function () {
        return Inertia::render('AccountSettings');
    });
    Route::post('/user/account-settings', 'UserController@updateSettings');
});

// Login, Create Account, Logout
Route::get('/login', function () {
    return Inertia::render('Login');
});
Route::post('/login', 'AuthController@login');
Route::middleware('auth')->get('/logout', function () {
    Auth::logout();
    return redirect('/');
});
Route::get('/create-account', function () {
    return Inertia::render('CreateAccount');
});
Route::post('/create-account', 'AuthController@create');

// Cart
Route::get('/cart', function () {
    return Inertia::render('Cart');
});

// Checkout
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});
Route::post('/checkout', 'CheckoutController@process');

// Other Pages
Route::get('/about', function () {
    return Inertia::render('About');
});
Route::get('/about/faqs', function () {
    return Inertia::render('FAQs');
});
Route::get('/contact', function () {
    return Inertia::render('Contact');
});
Route::post('/contact', 'ContactController@send');

// Admin
/* Route::middleware('auth', 'admin')->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('AdminDashboard');
    });
    Route::resource('/admin/product', 'Admin\ProductController');
    Route::resource('/admin/order', 'Admin\OrderController');
    Route::resource('/admin/user', 'Admin\UserController');
}); */
