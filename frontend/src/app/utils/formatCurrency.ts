export function formatCurrency(value: number, currentLanguage: string) {
  return value.toLocaleString(currentLanguage, {
    style: 'currency',
    currency: currentLanguage === 'pt-BR' ? 'BRL' : 'USD',
  });
}
