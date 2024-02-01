import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { storage } from '../config/storage';

interface TranslationContextProps {
  currentLanguage: string | 'en' | 'pt-BR';
  handleChangeLanguage(language: 'en' | 'pt-BR'): void;
}

export const TranslationContext = createContext({} as TranslationContextProps);

export function TranslationProvider({ children }: {children: React.ReactNode}) {
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

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      handleChangeLanguage,
    }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
