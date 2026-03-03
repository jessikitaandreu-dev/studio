'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Printer, ArrowLeft, FileText, TriangleAlert, Building, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';

// --- TIPOS DE DATOS ---
type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
  estat?: string;
};

type UserData = {
  usuari: string;
  rol: 'admin' | 'administrador' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

type GroupedInvoice = {
  invoiceNumber: string;
  date: string;
  paymentMethod: string;
  status: string;
  client: UserData;
  company: UserData;
  lines: {
    concept: string;
    unitPrice: number;
    units: number;
    discount: number;
    vatRate: number;
    netTotal: number;
  }[];
  totals: {
    baseTotal: number;
    vatBreakdown: {
      rate: number;
      base: number;
      amount: number;
    }[];
    totalVatAmount: number;
    grandTotal: number;
  };
};

const API_URL = 'https://sheetdb.io/api/v1/suyauovjcvvpa';

// --- COMPONENTE PRINCIPAL ---
export default function DocumentsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<GroupedInvoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user_usuari');
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(user);
    }
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, docsRes] = await Promise.all([
          fetch(`${API_URL}?sheet=usuaris`),
          fetch(`${API_URL}?sheet=documents`),
        ]);

        if (!usersRes.ok || !docsRes.ok) {
          throw new Error('Error de conexión con el servidor.');
        }

        const allUsers: UserData[] = await usersRes.json();
        const allDocs: DocumentLine[] = await docsRes.json();

        const loggedInUser = allUsers.find(u => u.usuari?.trim().toLowerCase() === currentUser.trim().toLowerCase());
        
        if (!loggedInUser) {
          throw new Error("No se han podido verificar tus datos de usuario.");
        }

        const isAdmin = loggedInUser.rol && ['admin', 'administrador', 'treballador'].includes(loggedInUser.rol.trim().toLowerCase());
        
        const filteredDocs = isAdmin 
          ? allDocs 
          : allDocs.filter(doc => doc.usuari?.trim().toLowerCase() === currentUser.trim().toLowerCase());

        if (filteredDocs.length === 0) {
          setInvoices([]);
          return;
        }

        const grouped = groupAndProcessInvoices(filteredDocs, allUsers);
        setInvoices(grouped);

      } catch (e: any) {
        setError(e.message || 'Ha ocurrido un error inesperado.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const parseNumeric = (val: any): number => {
    if (typeof val === 'number') return val;
    if (typeof val !== 'string') return 0;
    const cleanedVal = val.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanedVal) || 0;
  };

  const groupAndProcessInvoices = (docs: DocumentLine[], users: UserData[]): GroupedInvoice[] => {
    const invoiceMap = new Map<string, DocumentLine[]>();
    docs.forEach(doc => {
      if(doc.num_factura) {
        const group = invoiceMap.get(doc.num_factura) || [];
        group.push(doc);
        invoiceMap.set(doc.num_factura, group);
      }
    });

    const myCompanyData: UserData = {
        usuari: 'aventura-aqui',
        rol: 'admin',
        empresa: 'Aventura-Aquí',
        fiscalid: 'B12345678',
        adreca: 'Calle de la Aventura, 123\n28080, Madrid, España',
        telefon: '+34 912 345 678'
    };

    return Array.from(invoiceMap.entries()).map(([invoiceNumber, lines]) => {
      const firstLine = lines[0];
      const clientData = users.find(u => u.usuari?.trim().toLowerCase() === firstLine.usuari?.trim().toLowerCase());
      const status = firstLine.estat || 'No pagado';

      const processedLines = lines.map(line => {
        const unitPrice = parseNumeric(line.preu_unitari);
        const units = parseNumeric(line.unitats);
        const discount = parseNumeric(line.dte);
        const lineTotal = unitPrice * units;
        const netTotal = lineTotal - (lineTotal * (discount / 100));
        return {
          concept: line.concepte,
          unitPrice,
          units,
          discount,
          vatRate: parseNumeric(line.iva),
          netTotal,
        };
      });

      const baseTotal = processedLines.reduce((sum, line) => sum + line.netTotal, 0);

      const vatBreakdownMap = new Map<number, { base: number; amount: number }>();
      processedLines.forEach(line => {
        const existing = vatBreakdownMap.get(line.vatRate) || { base: 0, amount: 0 };
        existing.base += line.netTotal;
        existing.amount += line.netTotal * (line.vatRate / 100);
        vatBreakdownMap.set(line.vatRate, existing);
      });
      
      const vatBreakdown = Array.from(vatBreakdownMap.entries()).map(([rate, { base, amount }]) => ({ rate, base, amount }));
      const totalVatAmount = vatBreakdown.reduce((sum, item) => sum + item.amount, 0);
      const grandTotal = baseTotal + totalVatAmount;

      return {
        invoiceNumber,
        date: firstLine.data,
        paymentMethod: firstLine.fpagament,
        status: status,
        client: clientData || { usuari: firstLine.usuari, rol: 'client', empresa: 'Cliente no encontrado', fiscalid: 'N/A', adreca: 'N/A', telefon: 'N/A' },
        company: myCompanyData,
        lines: processedLines,
        totals: {
          baseTotal,
          vatBreakdown,
          totalVatAmount,
          grandTotal,
        },
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string, options: Intl.DateTimeFormatOptions = {}): string => {
    if (!dateStr) return 'N/A';
    
    let date: Date;
    const parts = dateStr.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
    if (parts) {
      date = new Date(parseInt(parts[3]), parseInt(parts[2]) - 1, parseInt(parts[1]));
    } else {
      date = new Date(dateStr);
    }
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    return date.toLocaleDateString('es-ES', options);
  }

  // --- RENDERIZADO ---

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <Card>
          <CardHeader><Skeleton className="h-6 w-1/4" /></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // --- VISTA DETALLADA DE LA FACTURA ---
  if (selectedInvoice) {
    return (
      <div className="bg-secondary/30 min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
            </Button>
            <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Imprimir PDF
            </Button>
        </div>
        
        <Card id="zona-factura" className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 shadow-2xl bg-background">
          <header className="grid grid-cols-2 gap-8 mb-12 border-b pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Logo showText={false} disableLink={true} iconClassName="h-10 w-10" />
                <h2 className="text-2xl font-bold text-primary">{selectedInvoice.company.empresa}</h2>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">{selectedInvoice.company.adreca}</p>
              <p className="text-muted-foreground">ID Fiscal: {selectedInvoice.company.fiscalid}</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold uppercase tracking-wider">Factura</h1>
              <p className="mt-2">
                <span className="font-semibold">Nº Factura:</span> {selectedInvoice.invoiceNumber}
              </p>
              <p>
                <span className="font-semibold">Fecha:</span> {formatDate(selectedInvoice.date, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {selectedInvoice.status.trim().toLowerCase() === 'pagat' || selectedInvoice.status.trim().toLowerCase() === 'pagado' ? (
                <Badge variant="default" className="mt-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Pagado
                </Badge>
                ) : (
                <Badge variant="destructive" className="mt-2">
                    <XCircle className="mr-2 h-4 w-4" />
                    No pagado
                </Badge>
                )}
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-8 mb-12">
             <Card className="p-4 bg-secondary/30">
                <CardHeader className="p-2">
                    <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Cliente</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <p className="font-bold text-lg">{selectedInvoice.client.empresa || selectedInvoice.client.usuari}</p>
                    <p className="text-muted-foreground">{selectedInvoice.client.adreca}</p>
                    <p className="text-muted-foreground">ID Fiscal: {selectedInvoice.client.fiscalid}</p>
                    <p className="text-muted-foreground">Teléfono: {selectedInvoice.client.telefon}</p>
                </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Concepto</TableHead>
                  <TableHead className="text-right">P. Unitario</TableHead>
                  <TableHead className="text-right">Unidades</TableHead>
                  <TableHead className="text-right">Dto. %</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvoice.lines.map((line, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{line.concept}</TableCell>
                    <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">{line.units}</TableCell>
                    <TableCell className="text-right">{line.discount.toFixed(2)}%</TableCell>
                    <TableCell className="text-right font-semibold">{line.netTotal.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          
          <section className="flex justify-end mb-12">
              <div className="w-full max-w-sm space-y-4">
                  <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Imponible</span>
                      <span className="font-semibold">{selectedInvoice.totals.baseTotal.toFixed(2)} €</span>
                  </div>
                  {selectedInvoice.totals.vatBreakdown.map(vat => (
                      <div key={vat.rate} className="flex justify-between">
                          <span className="text-muted-foreground">IVA ({vat.rate}%) sobre {vat.base.toFixed(2)} €</span>
                          <span className="font-semibold">{vat.amount.toFixed(2)} €</span>
                      </div>
                  ))}
                  <div className="border-t my-2"></div>
                   <div className="flex justify-between text-xl font-bold text-primary">
                      <span>TOTAL</span>
                      <span>{selectedInvoice.totals.grandTotal.toFixed(2)} €</span>
                  </div>
              </div>
          </section>
          
           <section className="border-t pt-8 mb-8">
                <p><span className='font-semibold'>Forma de Pago:</span> {selectedInvoice.paymentMethod}</p>
           </section>

          <footer className="text-xs text-muted-foreground text-center border-t pt-4">
            <p>{selectedInvoice.company.empresa} - {selectedInvoice.company.adreca}</p>
            <p>Inscrita en el Registro Mercantil de Madrid, Tomo [Número], Folio [Número], Hoja [Número], Inscripción [Número].</p>
            <p className="mt-2">De conformidad con lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, sus datos serán tratados bajo la responsabilidad de {selectedInvoice.company.empresa} con la finalidad de gestionar nuestra relación comercial.</p>
          </footer>
        </Card>
      </div>
    );
  }

  // --- VISTA DE LISTADO DE FACTURAS ---
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FileText className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Mis Facturas</h1>
          <p className="text-muted-foreground">Consulta, descarga o imprime tus facturas.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Nº Factura</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map(invoice => (
                  <TableRow key={invoice.invoiceNumber}>
                    <TableCell>
                      {invoice.status.trim().toLowerCase() === 'pagat' || invoice.status.trim().toLowerCase() === 'pagado' ? (
                        <div className="flex items-center gap-2 font-medium text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="hidden sm:inline">Pagado</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 font-medium text-red-600">
                          <XCircle className="h-5 w-5" />
                          <span className="hidden sm:inline">No pagado</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>{invoice.client.empresa || invoice.client.usuari}</TableCell>
                    <TableCell className="text-right font-semibold">{invoice.totals.grandTotal.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No se han encontrado facturas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}