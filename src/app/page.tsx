import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getFeaturedExcursions, excursionCategories } from '@/lib/excursions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExcursionCard } from '@/components/excursion-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredExcursions = getFeaturedExcursions();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const categoryImages = {
    family: PlaceHolderImages.find(p => p.id === 'pirate-treasure-hunt'),
    singles: PlaceHolderImages.find(p => p.id === 'singles-boat-party'),
    'nature-adventure': PlaceHolderImages.find(p => p.id === 'canyoning-adventure'),
    animals: PlaceHolderImages.find(p => p.id === 'hiking-with-dogs'),
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover brightness-50"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-shadow-lg animate-fade-in-down">
            Tu Aventura Comienza Aquí
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body animate-fade-in-up animation-delay-300">
            Explora destinos increíbles con Todos tenemos derecho a disfrutar. Excursiones únicas diseñadas para cada tipo de aventurero.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="font-bold">
              <Link href="/excursions">Ver Excursiones</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/recommendations">Obtener Recomendación</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Excursiones Destacadas</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {featuredExcursions.map((excursion, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <ExcursionCard excursion={excursion} className="h-full"/>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      <section id="about" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg max-w-none text-secondary-foreground font-body">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Sobre Todos tenemos derecho a disfrutar</h2>
            <p className="lead">
              Nacimos de la pasión por descubrir el mundo y conectar con la naturaleza. En Todos tenemos derecho a disfrutar, creemos que cada viaje es una oportunidad para crear recuerdos imborrables.
            </p>
            <p>
              Nuestra misión es ofrecer experiencias auténticas y emocionantes, adaptadas a todos los espíritus aventureros. Desde tranquilas escapadas familiares hasta desafíos llenos de adrenalina, contamos con un equipo de guías expertos y comprometidos con la seguridad y la sostenibilidad.
            </p>
            <Button asChild className="mt-4" size="lg">
              <Link href="/transport">Nuestros Servicios <ArrowRight /></Link>
            </Button>
          </div>
          <div className="relative h-80 md:h-full rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
            {PlaceHolderImages.find(p => p.id === 'about-us') && (
              <Image
                src={PlaceHolderImages.find(p => p.id === 'about-us')!.imageUrl}
                alt="Equipo de Todos tenemos derecho a disfrutar"
                fill
                className="object-cover"
                data-ai-hint={PlaceHolderImages.find(p => p.id === 'about-us')!.imageHint}
              />
            )}
          </div>
        </div>
      </section>
      
      <section id="categories" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Explora por Categoría</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {excursionCategories.map((category) => {
              const image = categoryImages[category.id as keyof typeof categoryImages];
              return (
              <Link href={`/excursions/${category.id}`} key={category.id} className="group">
                <Card className="h-full overflow-hidden text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative">
                   {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.title}
                      fill
                      className="object-cover brightness-50 group-hover:brightness-75 transition-all"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-2 h-full relative text-white">
                    <CardTitle className="text-xl font-bold text-shadow-lg">{category.title}</CardTitle>
                    <CardDescription className="text-white/90 text-shadow">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>
        </div>
      </section>

    </div>
  );
}
