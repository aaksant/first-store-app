'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

type ProvidersProps = { children: ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </>
  );
}
