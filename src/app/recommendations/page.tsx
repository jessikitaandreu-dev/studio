import { RecommendationForm } from '@/components/recommendation-form';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recomendador de Aventuras AI',
  description: 'No sabes qué aventura elegir? Deja que nuestra inteligencia artificial te ayude a encontrar la excursión perfecta para ti.',
};

export default function RecommendationsPage() {
  return (
    <div className="bg-background">
      <section className="py-16 lg:py-20 text-center bg-accent/30">
        <div className="container mx-auto px-4">
          <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold">Recomendador de Aventuras IA</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto font-body text-muted-foreground">
            Responde unas pocas preguntas y deja que nuestra IA cree la aventura perfecta y personalizada solo para ti.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <RecommendationForm />
        </div>
      </section>
    </div>
  );
}
