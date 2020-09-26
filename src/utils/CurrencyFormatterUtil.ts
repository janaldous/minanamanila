import currencyFormatter from "currency-formatter";

export const formatCurrency = (price: number) => {
  return currencyFormatter.format(price, { code: "PHP" });
};
