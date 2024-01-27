import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { storage } from '../config/storage';

export default function useLanguage() {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<string | 'en' | 'pt-BR'>(() => {
    const languageStored = localStorage.getItem(storage.COUNTRY) || navigator.language;

    return languageStored;
  });

  async function handleChangeLanguage(language: 'en' | 'pt-BR') {
    try {
      setCurrentLanguage(language);
      localStorage.setItem(storage.COUNTRY, language);
      await i18n.changeLanguage(language);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      await i18n.changeLanguage(currentLanguage);
    })();
  }, [currentLanguage, i18n]);

  return {
    currentLanguage,
    handleChangeLanguage,
  };
}
