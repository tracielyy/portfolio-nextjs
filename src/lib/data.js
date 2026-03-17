export function getData(locale, filename) {
  try {
    return require(`@/data/${locale}/${filename}.json`);
  } catch {
    // Fallback to English if Chinese file doesn't exist
    return require(`@/data/en/${filename}.json`);
  }
}