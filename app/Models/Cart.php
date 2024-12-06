<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public static function getOrCreate($user)
    {
        $cart = $user->cart()->first();

        if (!$cart) {
            $cart = $user->cart()->create();
        }

        return $cart;
    }

    public function updateTotalPrice()
    {
        $totalPrice= $this->items->sum(function ($item) {
            return $item->quantity * $item->item_price;
        });

        $this->update([
            'total_price' => $totalPrice,
        ]);

        return $totalPrice;
    }

    public function isEmpty()
    {
        return $this->items->count() === 0;
    }
}
