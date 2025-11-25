import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    slug: '5-consejos-para-viajar-con-ninos',
    title: '5 Consejos para Viajar con Niños y no Morir en el Intento',
    description: 'Viajar en familia puede ser una experiencia maravillosa. Aquí te dejamos algunos consejos para que todo salga a la perfección.',
    author: 'Laura Pérez',
    date: '2024-05-15',
    imageId: 'blog-family-adventures',
    content: `
      <p>Viajar con niños puede parecer una tarea desalentadora, pero con un poco de planificación, puede convertirse en la mejor aventura familiar. La clave está en la preparación y en mantener una actitud flexible.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">1. Involucra a los niños en la planificación</h3>
      <p>Deja que tus hijos participen en la elección del destino o de algunas actividades. Esto les hará sentirse parte del viaje y aumentará su emoción.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">2. Empaca de forma inteligente</h3>
      <p>No olvides sus juguetes o libros favoritos, un pequeño botiquín de primeros auxilios y muchos snacks. Una Tablet con sus dibujos animados preferidos puede ser tu salvación en momentos de crisis.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">3. Elige alojamientos amigables para niños</h3>
      <p>Busca hoteles o apartamentos que ofrezcan facilidades para familias, como cunas, tronas, o incluso clubs infantiles. Esto hará la estancia mucho más cómoda para todos.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">4. Flexibiliza el itinerario</h3>
      <p>No intentes abarcar demasiado. Los niños necesitan su propio ritmo. Planifica menos actividades y deja tiempo para el descanso, el juego improvisado y simplemente disfrutar del momento.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">5. ¡Disfruta del caos!</h3>
      <p>No todo saldrá según lo planeado, ¡y eso está bien! Las anécdotas más divertidas suelen surgir de los imprevistos. Relájate, ríete y crea recuerdos inolvidables junto a tu familia.</p>
    `
  },
  {
    slug: 'turismo-accesible-una-realidad-posible',
    title: 'Turismo Accesible: Una Realidad Posible',
    description: 'Descubre cómo el turismo accesible está abriendo un mundo de posibilidades para que todos puedan disfrutar del placer de viajar sin barreras.',
    author: 'Carlos Gómez',
    date: '2024-05-20',
    imageId: 'blog-accessible-tourism',
    content: `
      <p>El concepto de "turismo para todos" está ganando cada vez más fuerza. Afortunadamente, la industria turística está empezando a comprender la importancia de la accesibilidad, no solo como una obligación moral, sino como una oportunidad de mercado.</p>
      <p class="mt-4">En <strong>Todos tenemos derecho a disfrutar</strong>, estamos comprometidos con esta causa. Colaboramos estrechamente con proveedores que garantizan infraestructuras y servicios adaptados. Desde hoteles con habitaciones accesibles hasta excursiones con vehículos especiales como las sillas Joelette, nuestro objetivo es que nadie se quede sin la oportunidad de explorar.</p>
      <p class="mt-4">Planificar un viaje accesible requiere una investigación más exhaustiva, pero el resultado merece la pena. Es fundamental verificar la información sobre accesibilidad de antemano, contactar directamente con los proveedores y no tener miedo a preguntar. Cada vez más destinos, como museos, parques naturales y playas, están mejorando sus instalaciones para acoger a visitantes con todo tipo de necesidades.</p>
    `
  },
  {
    slug: 'aventuras-con-tu-mascota',
    title: 'Aventuras con tu Mascota: Consejos para un Viaje Inolvidable',
    description: '¿No te imaginas unas vacaciones sin tu fiel compañero? ¡No tienes por qué! Aquí te damos las claves para planificar la escapada perfecta con tu mascota.',
    author: 'Ana García',
    date: '2024-05-25',
    imageId: 'blog-pet-friendly-travel',
    content: `
      <p>¡Tu perro también merece unas vacaciones! Viajar con tu mascota es una experiencia increíble que refuerza vuestro vínculo. Aquí tienes algunos consejos para que todo vaya sobre ruedas (o sobre patas).</p>
      <h3 class="font-bold text-xl mt-6 mb-2">1. Elige un Destino "Pet-Friendly"</h3>
      <p>Investiga destinos que no solo permitan mascotas, sino que les den la bienvenida. Busca zonas con parques, playas para perros y rutas de senderismo donde puedan correr y explorar.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">2. Prepara su Equipaje</h3>
      <p>Al igual que tú, tu perro necesita su propia maleta. No olvides su comida habitual, su cama, juguetes, bolsas para excrementos, su correa y, muy importante, su documentación y un botiquín básico.</p>
      <h3 class="font-bold text-xl mt-6 mb-2">3. Seguridad en el Transporte</h3>
      <p>Ya sea en coche, tren o avión, la seguridad es lo primero. Utiliza un transportín adecuado y homologado. Si viajas en coche, asegúrate de que vaya seguro y haz paradas frecuentes para que pueda estirar las patas y beber agua.</p>
    `
  },
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
