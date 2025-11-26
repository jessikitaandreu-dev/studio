'use client';

import { useEffect, useState } from 'react';
import { createExcursionVideo } from '@/ai/flows/create-excursion-video';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function HeroVideo() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateVideo() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await createExcursionVideo(null);
        setVideoUrl(result.video);
      } catch (err) {
        console.error('Error generating video:', err);
        setError('No se pudo generar el vídeo de introducción. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    }
    generateVideo();
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center text-center text-white bg-black">
      <div className="absolute inset-0 bg-black/60 z-10" />

      {videoUrl && !error && (
        <video
          key={videoUrl}
          className="absolute z-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="relative z-20 p-4 max-w-4xl mx-auto">
        {isLoading && (
          <div className="flex flex-col items-center animate-fade-in-down">
            <Loader2 className="h-16 w-16 animate-spin text-white" />
            <p className="mt-4 text-xl font-semibold">
              Generando un vídeo de tus aventuras...
            </p>
            <p className="mt-2 text-white/80">Esto puede tardar unos minutos.</p>
          </div>
        )}

        {error && (
             <div className="animate-fade-in-down">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-shadow-lg">
                    Tu Aventura Comienza Aquí
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-body">
                    Explora destinos increíbles con Todos tenemos derecho a disfrutar. Excursiones únicas diseñadas para cada tipo de aventurero.
                </p>
             </div>
        )}

        {!isLoading && (
          <div className="animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-shadow-lg">
              Tu Aventura Comienza Aquí
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-body">
              Explora destinos increíbles con Todos tenemos derecho a disfrutar. Excursiones únicas diseñadas para cada tipo de aventurero.
            </p>
          </div>
        )}
        
        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="font-bold">
                <Link href="/excursions">Ver Excursiones</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/recommendations">Obtener Recomendación</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
