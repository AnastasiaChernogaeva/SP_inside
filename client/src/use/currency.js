const formatterCurrency = new Intl.NumberFormat("de-DE", {
  currency: "EUR",
  style: "currency",
});

export function currency(value) {
  return formatterCurrency.format(value);
}
