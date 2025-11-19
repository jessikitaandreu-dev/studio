import { getExcursionBySlug, getExcursions } from '@/lib/excursions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const excursion = getExcursionBySlug(params.slug);

  if (!excursion) {
    return {
      title: 'Excursión no encontrada',
    };
  }

  return {
    title: excursion.title,
    description: excursion.description,
  };
}

export async function generateStaticParams() {
  const excursions = getExcursions();
  return excursions.map((excursion) => ({
    category: excursion.category,
    slug: excursion.slug,
  }));
}

export default function ExcursionDetailPage({ params }: { params: { slug: string } }) {
  const excursion = getExcursionBySlug(params.slug);

  if (!excursion) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === excursion.imageId);

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-end text-white p-8">
        {image && (
          <Image
            src={image.imageUrl}
            alt={excursion.title}
            fill
            priority
            className="object-cover brightness-50"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="relative z-10 container mx-auto">
          <Badge variant="secondary" className="mb-2">{excursion.categoryLabel}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            {excursion.title}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 prose prose-lg max-w-none font-body">
            <h2 className="font-headline">Descripción de la Aventura</h2>
            <p>{excursion.description}</p>
            
            <h2 className="font-headline mt-12">Itinerario</h2>
            <ul className="list-none p-0">
              {excursion.itinerary.map((item, index) => (
                <li key={index} className="flex items-start gap-4 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-1 h-fit lg:sticky top-24">
            <Card className="shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold font-headline">Detalles de la Excursión</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold">Lugar de Salida</p>
                    <p className="text-muted-foreground">{excursion.departureLocation}</p>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-4" asChild>
                    <Link href="/recommendations">Reservar Ahora</Link>
                </Button>
                 <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link href="/excursions">Ver más excursiones</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
