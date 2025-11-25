import { getBlogPosts } from '@/lib/blog';
import { BlogPostCard } from '@/components/blog-post-card';
import type { Metadata } from 'next';
import { Rss } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog de Aventuras',
  description: 'Consejos, historias e inspiración para tus próximas aventuras. Explora nuestro blog y prepárate para tu siguiente viaje.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="bg-background">
      <section className="py-16 lg:py-24 bg-secondary text-center">
          <div className="container mx-auto px-4">
              <Rss className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold">Nuestro Blog de Aventuras</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto font-body text-secondary-foreground">
                  Aquí encontrarás inspiración, consejos y relatos de viajes para encender tu espíritu aventurero.
              </p>
          </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-2xl font-bold">Próximamente...</h2>
              <p className="mt-2 text-muted-foreground font-body">Aún no hemos publicado ningún artículo. ¡Vuelve pronto!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
