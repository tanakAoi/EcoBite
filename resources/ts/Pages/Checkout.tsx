import { usePage } from "@inertiajs/react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51QT2jfGM3tsnbU0zeuYylJtYVS2nxxSXEjKgf5jMp4GhUNrKEWhvS0OxUXHOGhPL54ZgJGnX7urvGhNIGf95NZWo00erVkp35B"
);

const Checkout = () => {
    const { props } = usePage();
    const { cartData } = props;

    const cart = JSON.parse(cartData);
    console.log(cart);
    
    const options = {
        mode: "payment",
        amount: cart.total_price * 1000 as number,
        currency: "sek",
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <h1>Checkout</h1>
            <CheckoutForm cart={cart} />
        </Elements>
    );
};

export default Checkout;
