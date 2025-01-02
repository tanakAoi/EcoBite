<?php

namespace App\Services;

use DeepL\Translator;
use Illuminate\Support\Facades\Cache;

class TranslationService
{
    protected $translator;

    public function __construct()
    {
        $this->translator = new Translator(env('DEEPL_API_KEY'));
    }

    public function translateText(string $text, string $lang): string
    {
        $lang = strtoupper(session('locale', 'en'));

        if ($lang === 'JP') {
            $lang = 'JA';
        } else if ($lang === 'EN') {
            $lang = 'EN-US';
        }

        $translated = $this->translator->translateText($text, null, $lang);

        return $translated->text;
    }

    public function translateAndCache($data, string $cacheKey, string $lang, callable $translationCallback, $ttl = 86400)
    {
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $translatedData = $translationCallback($data, $lang);

        Cache::put($cacheKey, $translatedData, $ttl);

        return $translatedData;
    }

    public function translateSingleRecipe($recipe, string $lang)
    {
        $recipe->title = $this->translateText($recipe->title, $lang);
        $recipe->description = $this->translateText($recipe->description, $lang);
        $recipe->instructions = $this->translateText($recipe->instructions, $lang);

        $recipe->ingredients = $recipe->ingredients->map(function ($ingredient) use ($lang) {
            if ($ingredient->product) {
                $ingredient->product->name = $this->translateText($ingredient->product->name, $lang);
            } else {
                $ingredient->name = $this->translateText($ingredient->name, $lang);
            }
            return $ingredient;
        });

        return $recipe;
    }

    public function translateSingleProduct($product, string $lang)
    {
        $product->name = $this->translateText($product->name, $lang);
        $product->description = $this->translateText($product->description, $lang);

        return $product;
    }
}
