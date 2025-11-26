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
    <Card className={cn("flex flex-col overflow-hidden group", className)}>
      <Link href={`/excursions/${excursion.category}/${excursion.slug}`} className="flex flex-col h-full bg-card rounded-lg border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={excursion.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
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
          <Badge variant="secondary" className="mb-2 text-xs">{excursion.categoryLabel}</Badge>
          <CardTitle className="text-xl mb-2 font-bold">{excursion.title}</CardTitle>
          <CardDescription className="line-clamp-3 font-body text-sm">{excursion.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
            <span className="flex items-center text-sm font-bold text-primary group-hover:underline">
              Ver más <ArrowRight className="ml-1 h-4 w-4" />
            </span>
        </CardFooter>
      </Link>
    </Card>
  );
}
