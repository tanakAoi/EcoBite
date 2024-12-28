<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExchangeRateService
{
    public function getRates()
    {
        return cache()->remember('exchangeRates', 60 * 60 * 24, function () {
            
            $response = Http::get(
                'https://openexchangerates.org/api/latest.json',
                [
                    'app_id' => env('OER_APP_ID'),
                    'symbols' => 'USD,JPY,SEK',
                ]
            );

            if (!$response->successful()) {
                Log::error('Failed to fetch exchange rates', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return [];
            }

            $rates = $response->json('rates');
            $baseCurrency = config('shop.currency', 'SEK');

            if ($baseCurrency !== 'USD' && isset($rates[$baseCurrency])) {
                $baseRate = $rates[$baseCurrency];
                foreach ($rates as $currency => $rate) {
                    $rates[$currency] = $rate / $baseRate;
                }
            }

            return $rates;;
        });
    }
}
