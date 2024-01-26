import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { storage } from '../config/storage';

export default function useLanguage() {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<Promise<string> | 'en' | 'pt-BR'>(async () => {
    const languageStored = localStorage.getItem(storage.COUNTRY) || navigator.language;
    await i18n.changeLanguage(languageStored);

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

  return {
    currentLanguage,
    handleChangeLanguage,
  };
}
