export type ExcursionCategory =
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
  arrivalLocation: string;
  duration: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  imageId: string;
  content: string;
};
