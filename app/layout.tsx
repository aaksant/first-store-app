import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import Container from '@/components/globals/container';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'NextStore',
  description: 'Generic store app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Providers>
            <Navbar />
            <Container className="px-20 py-20">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
