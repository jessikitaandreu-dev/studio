'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizedAdventureRecommendationAction } from '@/app/actions/recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, AlertTriangle, Route } from 'lucide-react';
import type { PersonalizedAdventureRecommendationOutput } from '@/ai/flows/personalized-adventure-recommendation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  riskLevel: z.string().min(1, 'Por favor selecciona un nivel de riesgo.'),
  landscapePreferences: z.string().min(3, 'Describe brevemente los paisajes que prefieres.'),
  equipmentNeeds: z.string().min(3, 'Indica qué equipamiento te gustaría que estuviera incluido.'),
  groupDynamic: z.string().min(1, 'Por favor selecciona la dinámica de grupo.'),
  priceRange: z.string().min(1, 'Especifica tu rango de precios.'),
  availability: z.string().min(1, 'Indica tus fechas disponibles.'),
});

type FormValues = z.infer<typeof formSchema>;

type RecommendationState = {
  data: PersonalizedAdventureRecommendationOutput | null;
  error: string | null;
};

const initialState: RecommendationState = {
  data: null,
  error: null,
};

export function RecommendationForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(personalizedAdventureRecommendationAction, initialState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskLevel: '',
      landscapePreferences: '',
      equipmentNeeds: '',
      groupDynamic: '',
      priceRange: '',
      availability: '',
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error en la recomendación',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  const { isSubmitting } = form.formState;
  
  const onSubmit = (data: FormValues) => {
    formAction(data);
  };

  return (
    <div className="grid lg:grid-cols-5 gap-12">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Cuéntanos tus preferencias</CardTitle>
            <CardDescription>Rellena el formulario para que nuestra IA te sorprenda.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="riskLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-semibold">Nivel de Riesgo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem>
                            <FormControl>
                                <RadioGroupItem value="bajo" id="risk-low" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="risk-low" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Bajo
                            </FormLabel>
                          </FormItem>
                           <FormItem>
                            <FormControl>
                                <RadioGroupItem value="medio" id="risk-medium" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="risk-medium" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Medio
                            </FormLabel>
                          </FormItem>
                           <FormItem>
                            <FormControl>
                                <RadioGroupItem value="alto" id="risk-high" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="risk-high" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Alto
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupDynamic"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-semibold">Dinámica de Grupo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem>
                            <FormControl>
                                <RadioGroupItem value="familiar" id="group-family" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="group-family" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Familiar
                            </FormLabel>
                          </FormItem>
                           <FormItem>
                            <FormControl>
                                <RadioGroupItem value="solteros" id="group-singles" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="group-singles" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Solteros
                            </FormLabel>
                          </FormItem>
                           <FormItem>
                            <FormControl>
                                <RadioGroupItem value="accesible" id="group-accessible" className="sr-only"/>
                            </FormControl>
                            <FormLabel htmlFor="group-accessible" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Accesible
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="landscapePreferences"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Preferencias de Paisaje</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: montañas, playas..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="equipmentNeeds"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Equipamiento Necesario</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: equipo de senderismo..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Rango de Precios</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: económico, moderado..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Disponibilidad</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: fines de semana, agosto..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando tu aventura...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Obtener Recomendación
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 sticky top-24 h-fit">
        {isSubmitting && (
            <Card className="flex flex-col items-center justify-center min-h-[500px] bg-card">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground font-body">Generando tu aventura perfecta...</p>
            </Card>
        )}
        {!isSubmitting && state.data && (
             <Card className="bg-card shadow-lg animate-fade-in-up">
                <CardHeader>
                    <CardDescription className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Tu aventura recomendada</CardDescription>
                    <CardTitle className="text-2xl">{state.data.excursionName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-body">
                    <p className="text-muted-foreground">{state.data.excursionDescription}</p>
                    <div>
                        <h4 className="font-bold font-headline text-lg mb-2">Itinerario Sugerido:</h4>
                        <Textarea readOnly value={state.data.excursionItinerary} rows={6} className="bg-secondary/30 text-sm" />
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Route className="h-4 w-4"/> <strong>Ubicación:</strong> {state.data.excursionLocation}</p>
                </CardFooter>
             </Card>
        )}
        {!isSubmitting && !state.data && (
             <Card className="hidden lg:flex flex-col items-center justify-center text-center min-h-[500px] bg-secondary/30 border-2 border-dashed">
                <Sparkles className="h-16 w-16 text-primary/50" />
                <h3 className="mt-4 text-xl font-bold">¿Listo para la aventura?</h3>
                <p className="mt-2 text-muted-foreground max-w-sm">Completa el formulario y deja que nuestra IA encuentre la excursión perfecta para ti.</p>
             </Card>
        )}
      </div>
    </div>
  );
}
