'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  Search,
  Package,
  Truck,
  Warehouse,
  CheckCircle,
  XCircle,
} from 'lucide-react';

type ShipmentData = {
  tracking_code: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
  estimated_delivery: string;
  location: string;
};

const statusConfig = {
  'En magatzem': {
    progress: 10,
    color: 'bg-yellow-500',
    icon: Warehouse,
    text: 'En Almacén',
  },
  'En trànsit': {
    progress: 50,
    color: 'bg-blue-500',
    icon: Truck,
    text: 'En Tránsito',
  },
  'Lliurat': {
    progress: 100,
    color: 'bg-green-500',
    icon: CheckCircle,
    text: 'Entregado',
  },
};

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      setError('Por favor, introduce un código de seguimiento.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/suyauovjcvvpa/search?tracking_code=${trackingCode}`
      );
      const data: ShipmentData[] = await response.json();

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('Codi no trobat. Revisa el código e inténtalo de nuevo.');
      }
    } catch (err) {
      setError(
        'Error al conectar con el servicio de seguimiento. Inténtalo más tarde.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const currentStatus = shipment ? statusConfig[shipment.status] : null;


  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-12">
        <Package className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold">
          Localitza el teu enviament
        </h1>
        <p className="mt-2 text-lg text-muted-foreground font-body">
          Introduce tu código de seguimiento para ver el estado actual de tu
          paquete.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Ej: ABC-123456789"
            className="text-center sm:text-left text-lg h-14"
            aria-label="Código de seguimiento"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Cercar
              </>
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {shipment && currentStatus && (
          <Card className="shadow-lg animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Package size={28} className="text-primary" />
                <span>Resultados para: {shipment.tracking_code}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Estado del Envío</h3>
                    <div className="flex items-center gap-2">
                        <currentStatus.icon className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg text-primary">{currentStatus.text}</span>
                    </div>
                  </div>
                  <Progress value={currentStatus.progress} className={currentStatus.color} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Almacén</span>
                      <span>En Tránsito</span>
                      <span>Entregado</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
                    <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold text-sm text-muted-foreground">Ubicación Actual</p>
                        <p className="text-lg font-bold">{shipment.location}</p>
                    </div>
                     <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold text-sm text-muted-foreground">Entrega Estimada</p>
                        <p className="text-lg font-bold">{shipment.estimated_delivery}</p>
                    </div>
                </div>

            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
