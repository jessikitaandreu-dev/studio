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
  const categoryImages = {
    singles: PlaceHolderImages.find(p => p.id === 'singles-boat-party'),
    'nature-adventure': PlaceHolderImages.find(p => p.id === 'canyoning-adventure'),
    animals: PlaceHolderImages.find(p => p.id === 'hiking-with-dogs'),
    family: PlaceHolderImages.find(p => p.id === 'farm-school'),
  }
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/60 z-10" />
          {heroImage && (
              <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
              />
          )}
          <div className="relative z-20 p-4 max-w-4xl mx-auto animate-fade-in-down">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-shadow-lg">
                  Tu Aventura Comienza Aquí
              </h1>
              <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-body">
                  Explora destinos increíbles con Todos tenemos derecho a disfrutar. Excursiones únicas diseñadas para cada tipo de aventurero.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
                  <Button asChild size="lg" className="font-bold">
                      <Link href="/excursions">Ver Excursiones</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="font-bold">
                      <Link href="/recommendations">Obtener Recomendación</Link>
                  </Button>
              </div>
          </div>
      </section>

      <section id="featured" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Excursiones Destacadas</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {featuredExcursions.map((excursion, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <ExcursionCard excursion={excursion} className="h-full"/>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" />
          </Carousel>
        </div>
      </section>
      
      <section id="categories" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Explora por Categoría</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {excursionCategories.map((category) => {
              const image = categoryImages[category.id as keyof typeof categoryImages];
              return (
              <Link href={`/excursions/${category.id}`} key={category.id} className="group">
                <Card className="h-full overflow-hidden text-center transform transition-all duration-300 hover:shadow-2xl relative aspect-video">
                   {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.title}
                      fill
                      className="object-cover brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <CardContent className="p-6 flex flex-col items-center justify-end gap-2 h-full relative text-white bg-gradient-to-t from-black/60 to-transparent">
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-shadow-lg">{category.title}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg max-w-none text-foreground font-body">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Sobre Todos tenemos derecho a disfrutar</h2>
            <p className="lead text-muted-foreground">
              Nacimos de la pasión por descubrir el mundo y conectar con la naturaleza. En Todos tenemos derecho a disfrutar, creemos que cada viaje es una oportunidad para crear recuerdos imborrables.
            </p>
            <p className="text-muted-foreground">
              Nuestra misión es ofrecer experiencias auténticas y emocionantes, adaptadas a todos los espíritus aventureros. Desde tranquilas escapadas familiares hasta desafíos llenos de adrenalina, contamos con un equipo de guías expertos y comprometidos con la seguridad y la sostenibilidad.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/transport">Nuestros Servicios <ArrowRight /></Link>
            </Button>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt="Equipo de Todos tenemos derecho a disfrutar"
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
