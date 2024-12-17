<!DOCTYPE html>
<html>

<head>
    <title>Order Confirmation</title>
</head>

<body>
    <h1>Order Confirmed!</h1>
    <p>Hi {{ $user->username }},</p>
    <p>Thank you for your order! Your order has been successfully placed.</p>
    <p>We'll notify you once your items are shipped. Below are the details of your order:</p>
    <ul>
        <li>Order ID: {{ $order->id }}</li>
        <li>Total Amount: {{ $order->total_price }}</li>
        <li>Items:</li>
        <ul>
            @foreach ($orderItems as $item)
                <li>{{ $item->name }} - Quantity: {{ $item->quantity }} - Price: {{ $item->price }}</li>
            @endforeach
        </ul>
    </ul>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Thank you for choosing EcoBite!</p>
</body>

</html>
