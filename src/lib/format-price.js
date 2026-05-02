const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

export function formatPrice(amount, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) {
    return "N/A";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency || DEFAULT_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}
