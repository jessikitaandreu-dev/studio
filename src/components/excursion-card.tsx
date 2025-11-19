import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Excursion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ExcursionCardProps = {
  excursion: Excursion;
  className?: string;
};

export function ExcursionCard({ excursion, className }: ExcursionCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === excursion.imageId);

  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
      <Link href={`/excursions/${excursion.category}/${excursion.slug}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={excursion.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            ) : (
              <div className="bg-muted h-full w-full flex items-center justify-center">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
            {excursion.isFeatured && (
              <Badge className="absolute top-3 right-3">Destacado</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="text-2xl mb-2">{excursion.title}</CardTitle>
          <Badge variant="secondary" className="mb-4">{excursion.categoryLabel}</Badge>
          <CardDescription className="line-clamp-3 font-body">{excursion.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
            <span className="flex items-center font-bold text-primary group-hover:text-primary-dark transition-colors">
              Ver más <ArrowRight className="ml-2 h-4 w-4" />
            </span>
        </CardFooter>
      </Link>
    </Card>
  );
}
