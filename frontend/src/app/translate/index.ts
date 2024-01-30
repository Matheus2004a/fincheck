import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage } from '../config/storage';
import enUS from './en/en-us.json';
import ptBr from './pt/pt-br.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enUS,
      'pt-BR': ptBr,
    },
    lng: localStorage.getItem(storage.COUNTRY) || navigator.language,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
