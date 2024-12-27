export const formatCurrency = (
    amount: number,
    locale: string,
    baseCurrency: string,
    targetCurrency: string,
    exchangeRate: { [key: string]: number }
): string => {
    const rate = exchangeRate[targetCurrency] || 1;

    const convertedAmount = amount * rate;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: targetCurrency,
    }).format(convertedAmount);
};
