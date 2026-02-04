import { Mountain } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  showText?: boolean;
  onClick?: () => void;
  disableLink?: boolean;
};

export function Logo({ className, textClassName, iconClassName, showText = true, onClick, disableLink = false }: LogoProps) {
  const logoContent = (
    <>
      {/* 
        Para usar tu propio logo:
        1. Sube tu archivo de logo (ej. logo.svg) a la carpeta `public`.
        2. Comenta o elimina la línea de <Mountain /> de abajo.
        3. Descomenta la línea del componente <Image />.
        4. Ajusta `width` y `height` a las dimensiones de tu logo.
        
        <Image src="/logo.svg" alt="Aventura-Aquí Logo" width={32} height={32} />
      */}
      <Mountain className={cn("h-8 w-8 text-primary", iconClassName)} />
      {showText && (
        <span className={cn("text-xl font-bold font-headline transition-colors text-foreground", textClassName)}>
          Aventura-Aquí
        </span>
      )}
    </>
  );

  if (disableLink) {
    return (
        <div className={cn("flex items-center gap-2", className)} onClick={onClick}>
            {logoContent}
        </div>
    );
  }

  return (
    <Link href="/" onClick={onClick} className={cn("flex items-center gap-2", className)}>
      {logoContent}
    </Link>
  );
}
