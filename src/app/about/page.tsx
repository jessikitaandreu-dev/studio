import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Users, Mountain, ShieldCheck, Heart } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description: 'Conoce la historia y la misión de "Todos tenemos derecho a disfrutar". Descubre nuestra pasión por las aventuras y el compromiso con nuestros clientes.',
};

const values = [
    {
        icon: Mountain,
        title: "Pasión por la Aventura",
        description: "Vivimos para explorar y compartir la emoción de descubrir nuevos lugares y experiencias."
    },
    {
        icon: ShieldCheck,
        title: "Seguridad Primero",
        description: "Tu bienestar es nuestra máxima prioridad. Contamos con guías expertos y protocolos rigurosos."
    },
    {
        icon: Heart,
        title: "Experiencias Auténticas",
        description: "Diseñamos viajes que te conectan con la cultura local y la naturaleza de una forma genuina."
    },
    {
        icon: Users,
        title: "Comunidad Inclusiva",
        description: "Creemos en el poder de viajar para unir a las personas. Creamos un ambiente amigable y abierto para todos."
    }
]

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Equipo de Todos tenemos derecho a disfrutar"
            fill
            priority
            className="object-cover brightness-50"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Nuestra Pasión es Tu Aventura
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Conoce la historia detrás de "Todos tenemos derecho a disfrutar" y por qué amamos lo que hacemos.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg lg:prose-xl text-center">
             <h2 className="text-3xl md:text-4xl font-bold">Nuestra Misión</h2>
             <p className="text-muted-foreground font-body text-lg">
                Nacimos de la pasión por descubrir el mundo y creemos que nadie debería quedarse atrás. En <strong>Todos tenemos derecho a disfrutar</strong>, nuestra misión destacada es crear aventuras inolvidables que puedas compartir con tus compañeros más fieles: tus animales. Diseñamos excursiones y viajes donde tus mascotas no solo son bienvenidas, sino que son las protagonistas. ¡Porque la aventura es mejor en compañía!
             </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
                const Icon = value.icon
                return (
                <div key={index} className="text-center bg-card p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-center items-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Icon className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">{value.title}</h3>
                    <p className="text-muted-foreground font-body text-sm">{value.description}</p>
                </div>
            )})}
          </div>
        </div>
      </section>

       <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">¿Listo para tu próxima aventura?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                Explora nuestras excursiones y encuentra la experiencia perfecta para ti.
            </p>
            <div className="mt-8">
                 <Button size="lg" asChild>
                    <Link href="/excursions">Ver Todas las Excursiones</Link>
                </Button>
            </div>
        </div>
       </section>
    </div>
  );
}
