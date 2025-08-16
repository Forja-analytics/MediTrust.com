'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { AuthProvider } from '@/lib/auth/auth-context';
import { I18nProvider } from '@/lib/i18n/use-translation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <I18nProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}