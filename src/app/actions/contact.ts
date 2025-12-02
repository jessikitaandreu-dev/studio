'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactState = {
  success: boolean;
  error: string | null;
};

export async function contactAction(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Datos del formulario no válidos. Por favor, inténtalo de nuevo.',
    };
  }

  try {
    // Aquí es donde normalmente enviarías el email o guardarías el mensaje en una base de datos.
    // Por ahora, solo simularemos un éxito.
    console.log('Mensaje recibido:', validatedFields.data);
    
    // Simular un pequeño retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, error: null };
  } catch (error) {
    console.error('Error al procesar el formulario de contacto:', error);
    return {
      success: false,
      error: 'No se pudo enviar el mensaje. Por favor, inténtalo más tarde.',
    };
  }
}
