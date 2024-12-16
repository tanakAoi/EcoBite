import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Cart } from "@/types";
import { StripeError } from "@stripe/stripe-js";
import { usePage } from "@inertiajs/react";


const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user, cart } = usePage().props;
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");

    const handleError = (error: StripeError) => {
        setIsProcessing(false);
        setErrorMessage(error.message ?? "An unknown error occurred");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        const response = await axios.post(
            route("checkout.create-payment-intent"),
            {
                email: user ? user.email : userEmail,
                totalPrice: cart.total_price,
            }
        );

        const { client_secret: clientSecret } = response.data;

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${process.env.APP_URL}/checkout/order-confirmation`,
            },
        });

        if (error) {
            handleError(error);
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form className="flex flex-col gap-10 px-20" onSubmit={handleSubmit}>
            <input
                type="email"
                value={user ? user.email : userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Please provide your email address."
                disabled={!!user}
                required
            />
            <div>
                <h2>Address</h2>
                <AddressElement options={{ mode: "shipping" }} />
            </div>
            <div>
                <h2>Payment</h2>
                <PaymentElement />
            </div>
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
            </button>
        </form>
    );
};

export default CheckoutForm;
