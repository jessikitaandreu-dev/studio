import Link from 'next/link';
import { excursionCategories } from '@/lib/excursions';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestras Excursiones',
  description: 'Explora todas las categorías de aventuras que Todos tenemos derecho a disfrutar tiene para ofrecer.',
};

export default function ExcursionsPage() {
  return (
    <div className="bg-background">
        <section className="py-16 lg:py-24 bg-secondary text-center">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold">Nuestras Excursiones</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto font-body text-secondary-foreground">
                    Tenemos una aventura para cada persona. Explora nuestras categorías y encuentra la experiencia perfecta para ti.
                </p>
            </div>
        </section>

      <section id="categories" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {excursionCategories.map((category) => (
              <Link href={`/excursions/${category.id}`} key={category.id} className="group">
                <Card className="h-full overflow-hidden text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card">
                  <CardContent className="p-8 flex flex-col items-center justify-center gap-4">
                    <CardTitle className="text-2xl font-bold mt-4">{category.title}</CardTitle>
                    <CardDescription className="font-body">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
