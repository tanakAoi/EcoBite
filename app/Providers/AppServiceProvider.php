<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
use App\Services\ExchangeRateService;
use App\Models\ShopSetting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('production') || $this->app->environment('dev')) {
            URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'user' => function () {
                return Auth::user() ? Auth::user() : null;
            },
            'cart' => function () {
                $sessionId = Session::getId();

                return Cart::with('items.product')
                    ->when(Auth::check(), function ($query) {
                        $query->where('user_id', Auth::id());
                    }, function ($query) use ($sessionId) {
                        $query->where('session_id', $sessionId);
                    })
                    ->first();
            },
            'locale' => function () {
                return session('locale', config('app.locale'));
            },
            'userCurrency' => function () {
                $currencyMap = [
                    'sv' => 'SEK',
                    'en' => 'USD',
                    'jp' => 'JPY',
                ];
                $currency = $currencyMap[session('locale')] ?? 'SEK';
                return session('userCurrency', $currency);
            },
            'shopCurrency' => function () {
                return ShopSetting::first()->shop_currency ?? 'SEK';
            },
            'exchangeRates' => function () {
                $exchangeRateService = app(ExchangeRateService::class);
                return $exchangeRateService->getRates();
            },
        ]);
    }
}
