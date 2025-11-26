import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Figtree } from 'next/font/google'

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: {
    default: 'Todos tenemos derecho a disfrutar',
    template: '%s | Todos tenemos derecho a disfrutar',
  },
  description: 'Aventuras y excursiones inolvidables para todos. ¡Descubre tu próximo destino con Todos tenemos derecho a disfrutar!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("scroll-smooth", figtree.variable)} suppressHydrationWarning>
      <body className={cn("font-body bg-background text-foreground antialiased min-h-screen flex flex-col")}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
