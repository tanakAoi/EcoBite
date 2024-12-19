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
import Button from "../Components/Button";

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

        const { client_secret: clientSecret, return_url: returnUrl } =
            response.data;

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: returnUrl,
            },
        });

        if (error) {
            handleError(error);
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form className="flex flex-col px-20" onSubmit={handleSubmit}>
            <div className="mb-6 flex flex-col">
                <label htmlFor="" className="font-serif">
                    Email
                </label>
                <input
                    type="email"
                    value={user ? user.email : userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Please provide your email address."
                    disabled={!!user}
                    required
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-6">
                <h3 className="font-serif mb-2">Address</h3>
                <AddressElement options={{ mode: "shipping" }} />
            </div>
            <div>
                <h3  className="font-serif mb-2">Payment</h3>
                <PaymentElement />
            </div>
            <Button
                label="Pay"
                type="submit"
                disabled={!stripe || isProcessing}
                className="mt-6"
            />
        </form>
    );
};

export default CheckoutForm;
