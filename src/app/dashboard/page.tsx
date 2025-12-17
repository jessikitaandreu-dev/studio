
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
      // Si no hi ha dades, redirigir al login
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_nom');
    localStorage.removeItem('user_empresa');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-secondary/30 py-12 px-4">
        <Card className="w-full max-w-2xl p-8">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-12 w-32 mt-6" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-secondary/30 py-12 px-4">
      <Card className="w-full max-w-2xl shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Benvingut/da, {userName}!
          </CardTitle>
          <CardDescription className="text-lg">
            Aquest és el teu panell de control privat.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nom d'usuari</p>
                <p className="text-lg font-semibold">{userName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Empresa</p>
                <p className="text-lg font-semibold">{userCompany}</p>
              </div>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="lg" className="mt-4">
            <LogOut className="mr-2 h-5 w-5" />
            Tancar Sessió
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
