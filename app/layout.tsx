import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Team Chat Application',
  description: 'Created by Kushi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
