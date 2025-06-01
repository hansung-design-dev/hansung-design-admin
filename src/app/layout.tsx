import { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import ClientProviders from '@/components/providers/client-providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'hansung-admin',
  description: 'hansung design admin service',
  icons: {
    icon: '/image/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body className="font-pretendard">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
