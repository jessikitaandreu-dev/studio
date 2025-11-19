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

  const { isSubmitting, isSubmitSuccessful } = form.formState;
  
  const onSubmit = (data: FormValues) => {
    formAction(data);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="riskLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-bold">Nivel de Riesgo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bajo" />
                        </FormControl>
                        <FormLabel className="font-normal">Bajo (Relajado y seguro)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medio" />
                        </FormControl>
                        <FormLabel className="font-normal">Medio (Un poco de emoción)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="alto" />
                        </FormControl>
                        <FormLabel className="font-normal">Alto (Pura adrenalina)</FormLabel>
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
                  <FormLabel className="text-lg font-bold">Dinámica de Grupo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="familiar" />
                        </FormControl>
                        <FormLabel className="font-normal">Familiar</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="solteros" />
                        </FormControl>
                        <FormLabel className="font-normal">Solteros</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="accesible" />
                        </FormControl>
                        <FormLabel className="font-normal">Accesible</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landscapePreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Preferencias de Paisaje</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: montañas, playas, bosques, desiertos..." {...field} />
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
                  <FormLabel className="text-lg font-bold">Equipamiento Necesario</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: equipo de senderismo, snorkel, todo incluido..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Rango de Precios</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: económico, moderado, premium..." {...field} />
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
                  <FormLabel className="text-lg font-bold">Disponibilidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: fines de semana, agosto, cualquier fecha..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
      </div>
      <div className="sticky top-24 h-fit">
        {isSubmitting && (
            <Card className="flex flex-col items-center justify-center h-96 bg-muted/50">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground font-body">Generando tu aventura perfecta...</p>
            </Card>
        )}
        {!isSubmitting && state.data && (
             <Card className="bg-gradient-to-br from-accent/50 to-background shadow-lg border-primary/50 animate-fade-in-up">
                <CardHeader>
                    <CardDescription className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Tu aventura recomendada</CardDescription>
                    <CardTitle className="text-3xl">{state.data.excursionName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-body">
                    <p>{state.data.excursionDescription}</p>
                    <div>
                        <h4 className="font-bold font-headline text-lg mb-2">Itinerario Sugerido:</h4>
                        <Textarea readOnly value={state.data.excursionItinerary} rows={6} className="bg-background/50" />
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Route className="h-4 w-4"/> <strong>Ubicación:</strong> {state.data.excursionLocation}</p>
                </CardFooter>
             </Card>
        )}
        {!isSubmitting && !state.data && (
             <Card className="flex flex-col items-center justify-center text-center h-96 bg-accent/20 border-dashed">
                <Sparkles className="h-16 w-16 text-primary/50" />
                <h3 className="mt-4 text-xl font-bold">¿Listo para la aventura?</h3>
                <p className="mt-2 text-muted-foreground max-w-sm">Completa el formulario y deja que nuestra IA encuentre la excursión perfecta para ti.</p>
             </Card>
        )}
      </div>
    </div>
  );
}
