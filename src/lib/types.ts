export type ExcursionCategory =
  | 'accessible'
  | 'family'
  | 'singles'
  | 'nature-adventure'
  | 'animals';

export type Excursion = {
  slug: string;
  title: string;
  category: ExcursionCategory;
  categoryLabel: string;
  isFeatured?: boolean;
  imageId: string;
  description: string;
  itinerary: string[];
  departureLocation: string;
};
