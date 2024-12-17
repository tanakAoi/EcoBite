<!DOCTYPE html>
<html>
<head>
    <title>Order Shipped</title>
</head>
<body>
    <h1>Your Order is on its Way!</h1>
    <p>Hi {{ $user->username }},</p>
    <p>Great news! Your order has been shipped and is on its way to you.</p>
    <p>Here are your shipping details:</p>
    <ul>
        <li>Order ID: {{ $order->id }}</li>
        <li>Tracking Number: {{ $order->tracking_number }}</li>
        <li>Courier: {{ $order->courier_name }}</li>
    </ul>
    <p>You can track your package using the tracking number provided above.</p>
    <p>Thank you for shopping with EcoBite!</p>
</body>
</html>
