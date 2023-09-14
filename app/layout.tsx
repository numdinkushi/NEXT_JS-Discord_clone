import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-providers';
import ClientOnly from '@/components/ClientOnly';
import { ModalProvider } from '@/components/providers/modal.provider';

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
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={false}
            storageKey='discord-theme'
          >
            <ClientOnly>
              <ModalProvider />
              {children}
            </ClientOnly>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
