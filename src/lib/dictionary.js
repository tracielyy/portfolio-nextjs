// lib/dictionary.js
import en from '@/dictionaries/en.json';
import zh from '@/dictionaries/zh.json';

const dictionaries = { en, zh };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en;
}