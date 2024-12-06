import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        axios
            .post("checkout/create-payment-intent")
            .then((response) => {
                setClientSecret(response.data.clientSecret);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("Card element not found");
            setIsProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                },
            }
        );

        if (error) {
            console.error(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("Payment successful");
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
            </button>
        </form>
    );
};

export default CheckoutForm;
