
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center text-primary font-bold hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tornar al perfil
        </Link>
        <ShieldCheck className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">Política de Privadesa</h1>
        <p className="text-muted-foreground mt-2 text-lg italic">Darrera actualització: 24 de maig de 2024</p>
      </div>

      <div className="prose prose-lg max-w-none font-body">
        <p>A <strong>Aventura-Aquí</strong>, la teva privadesa és la nostra prioritat. Ens comprometem a protegir les teves dades personals i a utilitzar-les de manera responsable i transparent.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Recollida de dades</h2>
        <p>Recollim dades personals només quan és necessari per oferir-te els nostres serveis d'aventura i transport. Això inclou el teu nom, correu electrònic, telèfon i dades d'empresa quan et registres o contractes una excursió.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Ús de la informació</h2>
        <p>Utilitzem les teves dades per:</p>
        <ul>
          <li>Gestionar les teves reserves i facturació.</li>
          <li>Realitzar el seguiment dels teus enviaments i serveis contractats.</li>
          <li>Enviar-te ofertes exclusives (si ens has donat el teu consentiment).</li>
          <li>Millorar la nostra plataforma web.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Seguretat</h2>
        <p>Implementem mesures de seguretat tècniques i organitzatives per protegir les teves dades contra accessos no autoritzats o pèrdues.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Els teus drets</h2>
        <p>Tens dret a accedir, rectificar o eliminar les teves dades en qualsevol moment. Pots fer-ho directament des del teu perfil o contactant amb nosaltres a <Link href="mailto:privadesa@aventura-aqui.com" className="text-primary hover:underline">privadesa@aventura-aqui.com</Link>.</p>
      </div>

      <div className="mt-12 pt-8 border-t text-center">
        <Button asChild>
          <Link href="/contact">Tens algun dubte?</Link>
        </Button>
      </div>
    </div>
  );
}
