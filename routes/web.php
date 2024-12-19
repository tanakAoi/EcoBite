<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RecipeIngredientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LanguageController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// Recipes
Route::get('/recipes', [RecipeController::class, 'index'])->name('recipe.index');
Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipe.show');
Route::post('/recipes/search', [RecipeController::class, 'search'])->name('recipe.search');
Route::middleware('auth')->group(function () {
    Route::get('/recipe/create', [RecipeController::class, 'create'])->name('recipe.create');
    Route::post('/recipe/store', [RecipeController::class, 'store'])->name('recipe.store');
});

// Recipe ingredients
Route::get('/api/recipe-ingredients', [RecipeIngredientController::class, 'getAllIngredients'])->name('api.recipe-ingredients');

// Products
Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::get('/api/products', [ProductController::class, 'getProducts'])->name('api.products');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('product.show');

// Cart
Route::get('/cart', [CartController::class, 'showCart'])->name('cart.index');
Route::delete('/cart/clear', [CartController::class, 'clearCart'])->name('cart.clear');
Route::post('/cart/item/add', [CartItemController::class, 'addItem'])->name('cart.item.add');
Route::put('/cart/item/update/{cartItemId}', [CartItemController::class, 'updateQuantity'])->name('cart.item.update');
Route::delete('/cart/item/delete/{cartItemId}', [CartItemController::class, 'removeItem'])->name('cart.item.delete');

// Checkout
Route::post('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout/create-payment-intent', [CheckoutController::class, 'createPaymentIntent'])->name('checkout.create-payment-intent');
Route::get('/checkout/order-confirmation', [CheckoutController::class, 'confirm'])->name('checkout.confirm');

// Order
Route::post('/order/store', [OrderController::class, 'store'])->name('order.store');

// User (Admin & Customer)
Route::middleware('auth')->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/password/update', [PasswordController::class, 'index'])->name('user.password.index');
    Route::delete('/user/delete', [ProfileController::class, 'destroy'])->name('user.delete');
});

// Customer
Route::middleware('auth')->group(function () {
    Route::get('/customer/order', [CustomerController::class, 'showOrder'])->name('customer.order.index');
});

// Admin
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get(
        '/admin',
        [AdminController::class, 'index']
    )
        ->name('admin.index');

    Route::resource('/admin/product', AdminProductController::class)
        ->names([
            'index' => 'admin.product.index',
            'create' => 'admin.product.create',
            'store' => 'admin.product.store',
            'show' => 'admin.product.show',
            'edit' => 'admin.product.edit',
            'update' => 'admin.product.update',
            'destroy' => 'admin.product.destroy',
        ]);
    Route::resource('/admin/order', AdminOrderController::class)
        ->names([
            'index' => 'admin.order.index',
            'show' => 'admin.order.show',
            'edit' => 'admin.order.edit',
            'update' => 'admin.order.update',
            'store' => 'admin.order.store',
        ]);
    Route::resource('/admin/user', AdminUserController::class)
        ->names([
            'index' => 'admin.user.index',
            'show' => 'admin.user.show',
            'edit' => 'admin.user.edit',
            'update' => 'admin.user.update',
            'destroy' => 'admin.user.destroy',
        ]);
});

// Other Pages
Route::get('/about', function () {
    return Inertia::render('Other/About');
});
Route::get('/faq', function () {
    return Inertia::render('Other/FAQ');
});
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', 'ContactController@send');

// Localization
Route::post('/lang-switch', [LanguageController::class, 'switchLanguage'])->name('lang.switch');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
