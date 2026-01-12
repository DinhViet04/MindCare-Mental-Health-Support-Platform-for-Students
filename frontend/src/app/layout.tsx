import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'MindCare',
  description: 'MindCare frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-slate-50 text-slate-900'>
        {children}
      </body>
    </html>
  );
}

