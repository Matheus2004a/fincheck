import { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';

export default function useLanguage() {
  return useContext(TranslationContext);
}
