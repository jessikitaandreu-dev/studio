'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Printer, ArrowLeft, FileText, TriangleAlert, Building, User, Phone, Mail } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
          throw new Error('Error de connexió amb el servidor.');
        }

        const allUsers: UserData[] = await usersRes.json();
        const allDocs: DocumentLine[] = await docsRes.json();

        const loggedInUser = allUsers.find(u => u.usuari === currentUser);
        if (!loggedInUser) {
          throw new Error("No s'han pogut verificar les teves dades d'usuari.");
        }

        const isAdmin = loggedInUser.rol && ['admin', 'administrador', 'treballador'].includes(loggedInUser.rol.toLowerCase());
        
        const filteredDocs = isAdmin 
          ? allDocs 
          : allDocs.filter(doc => doc.usuari === currentUser);

        if (filteredDocs.length === 0) {
          setInvoices([]);
          return;
        }

        const grouped = groupAndProcessInvoices(filteredDocs, allUsers);
        setInvoices(grouped);

      } catch (e: any) {
        setError(e.message || 'Hi ha hagut un error inesperat.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const parseNumeric = (val: any) => {
    if (typeof val !== 'string') return 0;
    return parseFloat(val.replace(',', '.')) || 0;
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

    const companyData = users.find(u => u.rol && ['admin', 'administrador', 'treballador'].includes(u.rol.toLowerCase()));

    return Array.from(invoiceMap.entries()).map(([invoiceNumber, lines]) => {
      const firstLine = lines[0];
      const clientData = users.find(u => u.usuari === firstLine.usuari);

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
        client: clientData || { usuari: firstLine.usuari, rol: 'client', empresa: 'Client no trobat', fiscalid: 'N/A', adreca: 'N/A', telefon: 'N/A' },
        company: companyData || { usuari: 'admin', rol: 'admin', empresa: 'Empresa no configurada', fiscalid: 'N/A', adreca: 'N/A', telefon: 'N/A' },
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
      return 'Data invàlida';
    }
    
    return date.toLocaleDateString('ca-ES', options);
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Tornar al llistat
            </Button>
            <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Imprimir PDF
            </Button>
        </div>
        
        <Card id="zona-factura" className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 shadow-2xl bg-background">
          <header className="grid grid-cols-2 gap-8 mb-12 border-b pb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">{selectedInvoice.company.empresa}</h2>
              <p className="text-muted-foreground">{selectedInvoice.company.adreca}</p>
              <p className="text-muted-foreground">ID Fiscal: {selectedInvoice.company.fiscalid}</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold uppercase tracking-wider">Factura</h1>
              <p className="mt-2">
                <span className="font-semibold">Nº Factura:</span> {selectedInvoice.invoiceNumber}
              </p>
              <p>
                <span className="font-semibold">Data:</span> {formatDate(selectedInvoice.date, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-8 mb-12">
             <Card className="p-4 bg-secondary/30">
                <CardHeader className="p-2">
                    <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Client</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <p className="font-bold text-lg">{selectedInvoice.client.empresa || selectedInvoice.client.usuari}</p>
                    <p className="text-muted-foreground">{selectedInvoice.client.adreca}</p>
                    <p className="text-muted-foreground">ID Fiscal: {selectedInvoice.client.fiscalid}</p>
                    <p className="text-muted-foreground">Telèfon: {selectedInvoice.client.telefon}</p>
                </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Concepte</TableHead>
                  <TableHead className="text-right">P. Unitari</TableHead>
                  <TableHead className="text-right">Unitats</TableHead>
                  <TableHead className="text-right">Dte. %</TableHead>
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
                      <span className="text-muted-foreground">Base Imposable</span>
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
                <p><span className='font-semibold'>Forma de Pagament:</span> {selectedInvoice.paymentMethod}</p>
           </section>

          <footer className="text-xs text-muted-foreground text-center border-t pt-4">
            <p>{selectedInvoice.company.empresa} - {selectedInvoice.company.adreca}</p>
            <p>Inscrita en el Registre Mercantil de [Ciutat], Tom [Número], Foli [Número], Full [Número], Inscripció [Número].</p>
            <p className="mt-2">De conformitat amb el que estableix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell, de 27 d'abril de 2016, les seves dades seran tractades sota la responsabilitat de {selectedInvoice.company.empresa} amb la finalitat de gestionar la nostra relació comercial.</p>
          </footer>
        </Card>
      </div>
    );
  }

  // --- VISTA DE LLISTAT DE FACTURES ---
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FileText className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Les Meves Factures</h1>
          <p className="text-muted-foreground">Consulta, descarrega o imprimeix les teves factures.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Factura</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Import</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map(invoice => (
                  <TableRow key={invoice.invoiceNumber}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>{invoice.client.empresa || invoice.client.usuari}</TableCell>
                    <TableCell className="text-right font-semibold">{invoice.totals.grandTotal.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                        Veure
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No s'han trobat factures.
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
