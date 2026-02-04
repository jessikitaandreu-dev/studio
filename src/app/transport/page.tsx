import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicios de Transporte',
  description: 'Ofrecemos servicios de transporte discrecional para grupos, eventos y traslados. Viaja con comodidad y seguridad con Aventura-Aquí.',
};

const services = [
    {
        imageId: "transport-modern-fleet",
        title: "Flota Moderna",
        description: "Vehículos modernos y cómodos, equipados con la última tecnología para un viaje placentero."
    },
    {
        imageId: "transport-maximum-security",
        title: "Máxima Seguridad",
        description: "Conductores profesionales y experimentados. Cumplimos con todas las normativas de seguridad vigentes."
    },
    {
        imageId: "transport-group-adapted",
        title: "Adaptado a Grupos",
        description: "Soluciones para grupos de cualquier tamaño, desde minibuses para equipos pequeños hasta autocares completos."
    },
    {
        imageId: "transport-premium-service",
        title: "Servicio Premium",
        description: "Atención personalizada, flexibilidad en rutas y horarios, y un servicio al cliente excepcional."
    }
]

export default function TransportPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'transport-hero');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Servicios de Transporte Discrecional
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Tu viaje, a tu manera. Te llevamos a donde necesites con la máxima comodidad y seguridad.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold">Viaja con Confianza y Comodidad</h2>
             <p className="mt-4 text-muted-foreground font-body text-lg">
                En Aventura-Aquí, no solo te llevamos de excursión, también ofrecemos un servicio de transporte discrecional de primera clase. Ya sea para un evento corporativo, una boda, un traslado al aeropuerto o cualquier viaje en grupo, nuestra flota está a tu disposición.
             </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
                const image = PlaceHolderImages.find(p => p.id === service.imageId);
                return (
                <div key={index} className="text-center bg-card rounded-xl shadow-sm flex flex-col overflow-hidden">
                    {image && (
                        <div className="relative w-full h-48">
                            <Image
                                src={image.imageUrl}
                                alt={service.title}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold font-headline mb-2">{service.title}</h3>
                        <p className="text-muted-foreground font-body text-sm flex-grow">{service.description}</p>
                    </div>
                </div>
            )})}
          </div>
        </div>
      </section>

       <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">¿Listo para tu próximo viaje en grupo?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                Ponte en contacto con nosotros para obtener un presupuesto personalizado sin compromiso.
            </p>
            <div className="mt-8">
                 <Button size="lg" asChild>
                    <Link href="/contact">Solicitar Presupuesto</Link>
                </Button>
            </div>
        </div>
       </section>
    </div>
  );
}
