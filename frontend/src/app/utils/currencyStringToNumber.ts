export function currencyStringToNumber(value: string) {
  const sanitizedString = value.replace(/\./g, '').replace(',', '.');
  return Number(sanitizedString);
}
