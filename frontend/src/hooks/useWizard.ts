import { useState, useEffect, useCallback } from 'react';
import type { WizardData } from '../types';

const STORAGE_KEY = 'wizardData';

const EMPTY_DATA: WizardData = { name: '', email: '', phone: '', plan: '' };

export function useWizard() {
  const [data, setData] = useState<WizardData>(EMPTY_DATA);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const update = useCallback((partial: Partial<WizardData>) => {
    setData((prev) => {
      const next = { ...prev, ...partial };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setData(EMPTY_DATA);
  }, []);

  return { data, update, clear };
}
