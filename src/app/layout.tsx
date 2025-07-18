import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import { Metadata, Viewport } from 'next';
import ClientProviders from '@/components/providers/client-providers';
import Sidebar from '@/components/sidebar';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Hansung-admin',
  description: 'Handung-design admin',
  icons: {
    icon: '/image/hansung-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body className={`${pretendard.variable} font-pretendard`}>
        <div className="flex h-screen">
          <ClientProviders>
            <Sidebar />
            <main className="flex-1 overflow-x-auto">{children}</main>
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
