
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  const offers = [
    {
      title: "Escapada Familiar 2x1",
      description: "Reserva una excursión familiar este mes y el segundo niño va gratis.",
      validUntil: "31 de Octubre",
      code: "FAMILIA24",
    },
    {
      title: "Pack Aventura Total",
      description: "Combina Canyoning y Senderismo con un 20% de descuento.",
      validUntil: "15 de Noviembre",
      code: "ADRENALINA20",
    }
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-12">
        <Tag className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold">Ofertas Exclusivas</h1>
        <p className="mt-4 text-lg text-muted-foreground">Como cliente de Aventura-Aquí, tienes acceso a promociones únicas.</p>
      </div>

      <div className="grid gap-8">
        {offers.map((offer, index) => (
          <Card key={index} className="overflow-hidden shadow-lg border-primary/20 bg-gradient-to-r from-background to-secondary/20">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 flex-grow">
                <Badge variant="default" className="mb-4">OFERTA LIMITADA</Badge>
                <CardTitle className="text-3xl mb-2">{offer.title}</CardTitle>
                <CardDescription className="text-lg mb-6">{offer.description}</CardDescription>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-primary" />
                    Válido hasta: {offer.validUntil}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Tag className="h-4 w-4 text-primary" />
                    Código: <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-bold">{offer.code}</span>
                  </div>
                </div>

                <Button size="lg" asChild>
                  <Link href="/contact">Solicitar Oferta <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard">Volver a mi perfil</Link>
        </Button>
      </div>
    </div>
  );
}

function Badge({ children, className, variant = "default" }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variant === 'default' ? 'bg-primary text-primary-foreground' : 'border border-input'} ${className}`}>
      {children}
    </span>
  );
}
