import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, User } from "lucide-react";

type BlogPostCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full group">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={post.title}
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
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3 font-body">{post.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex-col items-start gap-4">
            <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4"/>
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4"/>
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
            <span className="flex items-center font-bold text-primary group-hover:text-primary-dark transition-colors">
              Leer más <ArrowRight className="ml-2 h-4 w-4" />
            </span>
        </CardFooter>
      </Link>
    </Card>
  );
}
