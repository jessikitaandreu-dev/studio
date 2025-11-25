import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-end text-white p-8">
        {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover brightness-50"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="relative z-10 container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
                <User className="h-5 w-5"/>
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5"/>
                <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
            <article 
                className="prose prose-lg lg:prose-xl max-w-none font-body prose-headings:font-headline"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="text-center mt-16">
                <Button asChild size="lg">
                    <Link href="/blog">Volver al Blog</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
