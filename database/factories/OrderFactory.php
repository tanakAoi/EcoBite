<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\Order;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_price' => 0,
            'order_status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
        ];
    }

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            $orderItemsCount = fake()->numberBetween(1, 5);
            $orderItems = OrderItem::factory($orderItemsCount)->create(['order_id' => $order->id]);

            $totalPrice = $orderItems->sum('total_price');
            $order->update(['total_price' => $totalPrice]);
        });
    }
}
