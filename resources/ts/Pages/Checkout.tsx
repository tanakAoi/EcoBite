import { usePage } from "@inertiajs/react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import { useLaravelReactI18n } from "laravel-react-i18n";

const stripePromise = loadStripe(
    "pk_test_51QT2jfGM3tsnbU0zeuYylJtYVS2nxxSXEjKgf5jMp4GhUNrKEWhvS0OxUXHOGhPL54ZgJGnX7urvGhNIGf95NZWo00erVkp35B"
);

const Checkout = () => {
    const { cart, shopCurrency, locale } = usePage().props;
    const { t } = useLaravelReactI18n();

    const stripeLocale = locale === "jp" ? "ja" : locale;

    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: ((cart.total_price ?? 0) * 1000) as number,
                currency: shopCurrency.toLowerCase(),
                locale: stripeLocale as StripeElementLocale,
            }}
        >
            <h1 className="font-serif text-4xl font-bold mb-10 text-center">
                {t("Checkout")}
            </h1>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
