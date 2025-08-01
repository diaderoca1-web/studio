
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/layout/footer';
import { MobileFooter } from '@/components/layout/mobile-footer';
import { AuthProvider } from '@/contexts/auth-context';
import { SettingsProvider } from '@/contexts/settings-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Lucky Scratch',
  description: 'Your lucky day is just a scratch away!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <AuthProvider>
          <SettingsProvider>
            <div className="relative flex min-h-screen flex-col pb-20 md:pb-0">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileFooter />
            </div>
            <Toaster />
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
