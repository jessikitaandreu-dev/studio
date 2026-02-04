import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con nosotros. Estamos aquí para ayudarte a planificar tu próxima aventura.',
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="py-16 lg:py-24 text-center bg-secondary">
        <div className="container mx-auto px-4">
          <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold">Ponte en Contacto</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto font-body text-secondary-foreground">
            ¿Tienes alguna pregunta o quieres reservar una excursión? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Nuestra Oficina</h2>
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <p className="text-lg font-semibold">Aventura-Aquí</p>
                    <p className="text-muted-foreground font-body">
                      Calle de la Aventura, 123
                      <br />
                      28080, Madrid, España
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-headline mb-4">Información de Contacto</h3>
                <div className="space-y-4 font-body">
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <a href="tel:+34912345678" className="text-muted-foreground hover:text-primary transition-colors">
                            +34 912 345 678
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:info@aventura-aqui.com" className="text-muted-foreground hover:text-primary transition-colors">
                            info@aventura-aqui.com
                        </a>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-lg">
                 <h2 className="text-3xl font-bold font-headline mb-6">Envíanos un Mensaje</h2>
                 <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
