"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { Menu, X, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/excursions", label: "Excursiones" },
  { href: "/recommendations", label: "Recomendador AI" },
  { href: "/transport", label: "Transporte" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Mountain className="h-8 w-8 text-primary" />
            <span className={cn(
              "text-xl font-bold font-headline transition-colors", 
              isScrolled ? "text-foreground" : "text-white md:text-foreground"
            )}>
              Todos tenemos derecho a disfrutar
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "font-medium transition-colors hover:text-primary px-3 py-2 rounded-md text-sm",
                    isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-white", "hover:bg-white/10")}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-background p-0">
                  <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center p-6 border-b">
                          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                              <Mountain className="h-8 w-8 text-primary" />
                              <span className="text-lg font-bold font-headline text-foreground">
                                  Todos tenemos derecho a disfrutar
                              </span>
                          </Link>
                          <SheetTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <X className="h-6 w-6" />
                                  <span className="sr-only">Cerrar menú</span>
                              </Button>
                          </SheetTrigger>
                      </div>

                      <nav className="flex flex-col gap-2 p-6 text-lg">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-medium text-foreground transition-colors hover:text-primary py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
