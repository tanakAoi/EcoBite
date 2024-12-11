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
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

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
Route::middleware('auth')->group(function () {
    Route::get('/recipe/create', function () {
        return Inertia::render('CreateRecipe');
    });
    Route::post('/recipe/create', 'RecipeController@store');
});

// Products
Route::get('/products', [ProductController::class, 'index'])->name('product.index');
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
Route::middleware('auth')->group(
    function () {
/*         Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show'); */
    }
);
Route::post('/order/store', [OrderController::class, 'store'])->name('order.store');

// User (Admin & Customer)
Route::middleware('auth')->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/account-settings', [UserController::class, 'showAccount'])->name('user.account');
    Route::put('/user/account-settings/update/profile', [UserController::class, 'updateAccount'])->name('user.account.update.profile');
    Route::put('/user/account-settings/update/password', [UserController::class, 'updatePassword'])->name('user.account.update.password');
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

    Route::resource(
        '/admin/products',
        AdminProductController::class
    )
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
            'destroy' => 'admin.order.destroy',
        ]);
    /*     Route::resource('/admin/user', 'Admin\UserController'); */
});

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

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
