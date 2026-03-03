'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, LogIn, TriangleAlert } from 'lucide-react';

export default function LoginPage() {
  const [usuari, setUsuari] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuari || !password) {
      setError('El usuario y la contraseña son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/suyauovjcvvpa/search?sheet=usuaris&usuari=${encodeURIComponent(usuari)}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        throw new Error('Error de conexión con el servidor.');
      }

      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        // Guardar datos en localStorage
        localStorage.setItem('user_nom', user.nom);
        localStorage.setItem('user_empresa', user.empresa);
        localStorage.setItem('user_usuari', user.usuari);
        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        setError('Datos incorrectos. Por favor, verifica tu usuario y contraseña.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-secondary/30 py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Acceso de Usuarios</CardTitle>
          <CardDescription>Introduce tus datos para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuari">Usuario</Label>
              <Input
                id="usuari"
                type="text"
                placeholder="Tu usuario"
                value={usuari}
                onChange={(e) => setUsuari(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Error de acceso</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full h-12 text-lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}