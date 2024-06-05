import en from './locales/en/translation.json';
import he from './locales/he/translation.json';

const translations = {
  en,
  he,
};

let currentLanguage = 'he'; // Default language

export const setLanguage = (language) => {
  if (translations[language]) {
    currentLanguage = language;
  }
};

export const getTranslations = () => translations[currentLanguage];
