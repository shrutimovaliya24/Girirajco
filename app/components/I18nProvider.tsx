'use client';

import { useEffect } from 'react';
import '../i18n/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // i18n is initialized in the imported file
    // This component ensures i18n is loaded on the client side
  }, []);

  return <>{children}</>;
}

