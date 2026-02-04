import Link from 'next/link';
import { Logo } from '@/components/logo';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.15 2.33,6.94C2.33,8.43 3.11,9.75 4.19,10.53C3.47,10.51 2.8,10.32 2.2,10.03C2.2,10.05 2.2,10.06 2.2,10.08C2.2,12.21 3.73,13.99 5.82,14.43C5.46,14.52 5.08,14.56 4.69,14.56C4.42,14.56 4.15,14.53 3.89,14.48C4.45,16.22 6.1,17.48 8.08,17.52C6.58,18.71 4.76,19.45 2.78,19.45C2.44,19.45 2.1,19.43 1.76,19.38C3.78,20.73 6.15,21.5 8.75,21.5C16.01,21.5 20.3,15.54 20.3,10.16C20.3,9.98 20.3,9.8 20.29,9.62C21.11,9.02 21.86,8.26 22.46,7.35V6Z"></path></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,16.2V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path></svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="font-body text-sm text-muted-foreground mt-4">Aventuras que recordarás toda la vida.</p>
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg mb-4">Navegación</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/excursions" className="text-muted-foreground hover:text-primary transition-colors">Excursiones</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/transport" className="text-muted-foreground hover:text-primary transition-colors">Transporte</Link></li>
              <li><Link href="/tracking" className="text-muted-foreground hover:text-primary transition-colors">Seguimiento</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg mb-4">Categorías</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/excursions/nature-adventure" className="text-muted-foreground hover:text-primary transition-colors">Naturaleza</Link></li>
              <li><Link href="/excursions/animals" className="text-muted-foreground hover:text-primary transition-colors">Con Animales</Link></li>
              <li><Link href="/excursions/family" className="text-muted-foreground hover:text-primary transition-colors">Familiares</Link></li>
              <li><Link href="/excursions/singles" className="text-muted-foreground hover:text-primary transition-colors">Para Solteros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><InstagramIcon className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Aventura-Aquí. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
