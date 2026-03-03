
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center text-primary font-bold hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al perfil
        </Link>
        <ShieldCheck className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">Política de Privacidad</h1>
        <p className="text-muted-foreground mt-2 text-lg italic">Última actualización: 24 de mayo de 2024</p>
      </div>

      <div className="prose prose-lg max-none font-body">
        <p>En <strong>Aventura-Aquí</strong>, tu privacidad es nuestra prioridad. Nos comprometemos a proteger tus datos personales y a utilizarlos de manera responsable y transparente.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Recogida de datos</h2>
        <p>Recogemos datos personales solo cuando es necesario para ofrecerte nuestros servicios de aventura y transporte. Esto incluye tu nombre, correo electrónico, teléfono y datos de empresa cuando te registras o contratas una excursión.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso de la información</h2>
        <p>Utilizamos tus datos para:</p>
        <ul>
          <li>Gestionar tus reservas y facturación.</li>
          <li>Realizar el seguimiento de tus envíos y servicios contratados.</li>
          <li>Enviarte ofertas exclusivas (si nos has dado tu consentimiento).</li>
          <li>Mejorar nuestra plataforma web.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Seguridad</h2>
        <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no autorizados o pérdidas.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Tus derechos</h2>
        <p>Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento. Puedes hacerlo directamente desde tu perfil o contactando con nosotros en <Link href="mailto:privacidad@aventura-aqui.com" className="text-primary hover:underline">privacidad@aventura-aqui.com</Link>.</p>
      </div>

      <div className="mt-12 pt-8 border-t text-center">
        <Button asChild>
          <Link href="/contact">¿Tienes alguna duda?</Link>
        </Button>
      </div>
    </div>
  );
}
