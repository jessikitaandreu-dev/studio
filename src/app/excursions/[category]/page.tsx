import { getExcursionsByCategory, getCategoryDetails, excursionCategories } from '@/lib/excursions';
import { notFound } from 'next/navigation';
import { ExcursionCard } from '@/components/excursion-card';
import type { ExcursionCategory } from '@/lib/types';
import type { Metadata } from 'next';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryDetails = getCategoryDetails(params.category);
  
  if (!categoryDetails) {
    return {
      title: 'Categoría no encontrada'
    }
  }

  return {
    title: `Excursiones ${categoryDetails.title}`,
    description: `Descubre nuestras excursiones en la categoría: ${categoryDetails.title}.`,
  };
}

export async function generateStaticParams() {
  return excursionCategories.map((category) => ({
    category: category.id,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryDetails = getCategoryDetails(params.category);
  
  if (!categoryDetails) {
    notFound();
  }
  
  const excursions = getExcursionsByCategory(params.category as ExcursionCategory);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <categoryDetails.icon className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">{categoryDetails.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">{categoryDetails.description}</p>
        </div>

        {excursions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {excursions.map(excursion => (
              <ExcursionCard key={excursion.slug} excursion={excursion} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-bold">Próximamente...</h2>
            <p className="mt-2 text-muted-foreground font-body">No hay excursiones disponibles en esta categoría en este momento. ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </div>
  );
}
