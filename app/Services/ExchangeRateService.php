<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ExchangeRateService
{
    public function getRates()
    {
        return cache()->remember('exchangeRates', 60 * 60 * 24, function () {
            $response = Http::get(
                'https://openexchangerates.org/api/latest.json',
                [
                    'app_id' => env('OER_APP_ID'),
                    'base' => 'USD',
                    'symbols' => 'SEK,JPY',
                ]
            );

            return $response->json('rates');
        });
    }
}
