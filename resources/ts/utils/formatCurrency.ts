export const formatCurrency = (
    amount: number,
    locale: string,
    baseCurrency: string,
    targetCurrency: string,
    exchangeRate: { [key: string]: number },
    quantity?: number
): string => {
    const rate = exchangeRate[targetCurrency] || 1;

    const convertedAmount = amount * rate;

    if (quantity) {
        const totalAmount = convertedAmount * quantity;
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: targetCurrency,
        }).format(totalAmount);
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: targetCurrency,
    }).format(convertedAmount);
};
