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
      <Image src="/mundo.jpg" alt="Aventura-Aquí Logo" width={32} height={32} className={cn("rounded-full", iconClassName)} />
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
