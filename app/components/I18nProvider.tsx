'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../i18n/i18n';
import i18n from '../i18n/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const lng = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
    const valid: 'en' | 'gu' = lng === 'gu' ? 'gu' : 'en';
    const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=(en|gu)(?:;|$)`));
    const cookieVal = match?.[1];
    document.cookie = `${LOCALE_COOKIE}=${valid};path=/;max-age=31536000;samesite=lax`;
    if (cookieVal !== valid) {
      router.refresh();
    }
  }, [router]);

  return <>{children}</>;
}

