<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\User;
use Illuminate\Support\Facades\Log;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        $products = Product::factory(20)->create();

        Recipe::factory(10)->create();
        RecipeIngredient::factory(10)->create();

        $users->each(function (User $user) use ($products) {

            Order::factory(5)->create(['user_id' => $user->id])
                ->each(function (Order $order) use ($products) {
                    
                    $orderItems = OrderItem::factory(3)->create([
                        'order_id' => $order->id,
                        'product_id' => $products->random()->id,
                    ]);

                    $totalPrice = $orderItems->sum(fn($item) => $item->quantity * $item->product->price);
                    $order->update(['total_price' => $totalPrice]);

                    $orderItems->each(fn($item) => $item->update(['total_price' => $item->quantity * $item->product->price]));
            });
        });
    }
}
