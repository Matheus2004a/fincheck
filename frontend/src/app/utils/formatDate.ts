export function formatDate(date: Date, currentLanguage: string) {
  return new Date(date).toLocaleDateString(currentLanguage);
}
