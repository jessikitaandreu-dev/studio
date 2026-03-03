
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut, FileText, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userCompany, setUserCompany] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const nom = localStorage.getItem('user_nom');
    const empresa = localStorage.getItem('user_empresa');

    if (nom && empresa) {
      setUserName(nom);
      setUserCompany(empresa);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_nom');
    localStorage.removeItem('user_empresa');
    localStorage.removeItem('user_usuari');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Mis facturas",
      description: "Consulta y descarga tus documentos fiscales.",
      icon: FileText,
      href: "/documents",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Ofertas exclusivas",
      description: "Descubre promociones especiales para ti.",
      icon: Tag,
      href: "/offers",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "Privacidad",
      description: "Gestiona tus datos y preferencias de privacidad.",
      icon: ShieldCheck,
      href: "/privacy",
      color: "bg-green-500/10 text-green-600",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">¡Hola, {userName}! 👋</h1>
          <p className="text-muted-foreground text-lg mt-1">Bienvenido a tu portal de usuario de Aventura-Aquí.</p>
        </div>
        <Button onClick={handleLogout} variant="ghost" className="text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Card de Información del Usuario */}
        <Card className="md:col-span-1 shadow-md border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl">Tu perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
              <div className="bg-primary/20 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Usuario</p>
                <p className="font-semibold">{userName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
              <div className="bg-primary/20 p-2 rounded-full">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Empresa</p>
                <p className="font-semibold">{userCompany}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Acciones Rápidas */}
        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href} className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30 group-hover:-translate-y-1 overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {action.description}
                  </CardDescription>
                  <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                    Ir ahora <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
