import { Icons } from '@/components/icons';
import type { Excursion, ExcursionCategory } from './types';

export const excursionCategories = [
  {
    id: 'singles' as ExcursionCategory,
    title: 'Para Solteros',
    description: 'Conoce gente y vive experiencias.',
    icon: Icons.Singles,
  },
  {
    id: 'nature-adventure' as ExcursionCategory,
    title: 'Naturaleza y Aventura',
    description: 'Adrenalina en estado puro.',
    icon: Icons.Nature,
  },
  {
    id: 'animals' as ExcursionCategory,
    title: 'Con Mascotas',
    description: 'Aventuras junto a tu mejor amigo.',
    icon: Icons.Animals,
  },
];

export const excursions: Excursion[] = [
  {
    slug: 'fiesta-barco-solteros',
    title: 'Fiesta en Barco para Solteros',
    category: 'singles',
    categoryLabel: 'Para Solteros',
    imageId: 'singles-boat-party',
    description: 'Navega por la costa, disfruta de buena música, cócteles y conoce a otros solteros en un ambiente festivo y relajado al atardecer.',
    itinerary: ['Embarque en el puerto deportivo.', 'Navegación por la costa con música y DJ en vivo.', 'Parada para un baño en alta mar.', 'Cena tipo cóctel y barra libre.', 'Regreso al puerto.'],
    departureLocation: 'Puerto Deportivo "Marina del Sol"',
  },
  {
    slug: 'descenso-barrancos-nivel-iniciacion',
    title: 'Descenso de Barrancos (Iniciación)',
    category: 'nature-adventure',
    categoryLabel: 'Naturaleza y Aventura',
    isFeatured: true,
    imageId: 'canyoning-adventure',
    description: 'Iníciate en el barranquismo en un entorno seguro y espectacular. Salta a pozas de agua cristalina, deslízate por toboganes naturales y vive una descarga de adrenalina.',
    itinerary: ['Recepción y entrega de material.', 'Charla técnica y de seguridad.', 'Aproximación a pie al inicio del barranco.', 'Descenso del barranco con guía.', 'Regreso y fin de la actividad.'],
    departureLocation: 'Punto de encuentro en "Aventura Activa"',
  },
  {
    slug: 'avistamiento-cetaceos-barco',
    title: 'Avistamiento de Cetáceos',
    category: 'animals',
    categoryLabel: 'Con Mascotas',
    imageId: 'whale-watching',
    description: 'Embárcate en una expedición marina para observar delfines y ballenas en su hábitat natural, acompañado por biólogos marinos que compartirán su conocimiento.',
    itinerary: ['Salida desde el puerto.', 'Charla introductoria sobre la fauna marina local.', 'Navegación en busca de cetáceos.', 'Observación respetuosa de los animales.', 'Vuelta a puerto.'],
    departureLocation: 'Muelle de Pescadores',
  },
  {
    slug: 'ruta-gastronomica-pueblos',
    title: 'Ruta Gastronómica para Singles',
    category: 'singles',
    categoryLabel: 'Para Solteros',
    isFeatured: true,
    imageId: 'food-tour-singles',
    description: 'Descubre los sabores de la región mientras socializas. Un tour guiado por varios pueblos con encanto, degustando sus productos y platos típicos.',
    itinerary: ['Salida en minibús.', 'Visita al mercado local del primer pueblo.', 'Degustación de tapas y vino.', 'Almuerzo en un restaurante tradicional.', 'Visita a un obrador artesano y degustación de dulces.'],
    departureLocation: 'Plaza Mayor',
  },
  {
    slug: 'via-ferrata-amanecer',
    title: 'Vía Ferrata al Amanecer',
    category: 'nature-adventure',
    categoryLabel: 'Naturaleza y Aventura',
    imageId: 'via-ferrata-sunrise',
    description: 'Asciende por una pared rocosa equipada con escalones y cables de acero mientras el sol despunta en el horizonte. Una experiencia física y visualmente inolvidable.',
    itinerary: ['Encuentro nocturno y reparto de equipo.', 'Aproximación a la base de la vía ferrata.', 'Ascenso guiado durante el amanecer.', 'Llegada a la cima para disfrutar de las vistas.', 'Descenso por sendero de montaña.'],
    departureLocation: 'Parking del Refugio de Montaña',
  },
  {
    slug: 'senderismo-con-perros',
    title: 'Senderismo con Perros',
    category: 'animals',
    categoryLabel: 'Con Mascotas',
    isFeatured: true,
    imageId: 'hiking-with-dogs',
    description: 'Disfruta de una increíble ruta de senderismo por la montaña junto a tu perro. Una experiencia para conectar con la naturaleza y con tu mejor amigo.',
    itinerary: ['Punto de encuentro y bienvenida.', 'Inicio de la ruta de senderismo guiada.', 'Parada en un arroyo para que los perros se refresquen.', 'Picnic en la cima.', 'Regreso al punto de partida.'],
    departureLocation: 'Parking del Parque Natural de la Sierra',
  }
];

export function getExcursions() {
  return excursions;
}

export function getFeaturedExcursions() {
  return excursions.filter(excursion => excursion.isFeatured);
}

export function getExcursionsByCategory(category: ExcursionCategory) {
  return excursions.filter(excursion => excursion.category === category);
}

export function getExcursionBySlug(slug: string) {
  return excursions.find(excursion => excursion.slug === slug);
}

export function getCategoryDetails(categoryId: string) {
  return excursionCategories.find(cat => cat.id === categoryId);
}
