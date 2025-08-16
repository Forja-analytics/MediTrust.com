export interface Provider {
  id: string;
  name: string;
  title: string;
  organization: string;
  specialty: string;
  image: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  location: string;
  about: string;
  procedures: Procedure[];
  clinics: Clinic[];
  reviews: Review[];
  beforeAfter: BeforeAfter[];
  testimonials: Testimonial[];
  availability: AvailabilityDay[];
}

export interface Procedure {
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  amenities: string[];
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  procedure: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface BeforeAfter {
  id: string;
  procedure: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  title: string;
  videoThumbnail: string;
  duration: string;
}

export interface AvailabilityDay {
  date: string;
  slots: string[];
}

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Carlos Mendoza',
    title: 'Cirujano Plástico Certificado',
    organization: 'Centro Médico Bogotá',
    specialty: 'Cosmetic Surgery',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
    featured: true,
    rating: 4.9,
    reviewCount: 234,
    experience: 15,
    languages: ['Spanish', 'English'],
    location: 'Bogotá, Colombia',
    about: `Dr. Carlos Mendoza es un cirujano plástico certificado con más de 15 años de experiencia en cirugía cosmética y reconstructiva. Se graduó de la Universidad Nacional de Colombia y completó su residencia en el Hospital San Juan de Dios.

Dr. Mendoza se especializa en rejuvenecimiento facial, aumento de senos, contorno corporal y procedimientos reconstructivos. Ha realizado más de 3,000 cirugías exitosas y es conocido por sus resultados naturales.

Asiste regularmente a conferencias internacionales para mantenerse actualizado con las últimas técnicas en cirugía plástica. Es miembro de la Sociedad Colombiana de Cirugía Plástica.`,
    
    procedures: [
      { name: 'Rinoplastia', price: 8000000, duration: '2-3 horas', description: 'Cirugía de remodelación nasal' },
      { name: 'Aumento de Senos', price: 12000000, duration: '1-2 horas', description: 'Aumento mamario con implantes' },
      { name: 'Liposucción', price: 7000000, duration: '1-3 horas', description: 'Eliminación de grasa y contorno corporal' },
      { name: 'Abdominoplastia', price: 15000000, duration: '2-4 horas', description: 'Contorno abdominal' },
    ],

    clinics: [
      {
        id: '1',
        name: 'Centro Médico Bogotá',
        address: 'Carrera 15 #93-47, Chapinero, Bogotá',
        phone: '+57 1 234-5678',
        email: 'info@centromedicobogota.com',
        isPrimary: true,
        amenities: ['Quirófanos', 'Salas de Recuperación', 'Consultorios', 'Farmacia', 'Parqueadero']
      }
    ],

    reviews: [
      {
        id: '1',
        patientName: 'María S.',
        rating: 5,
        date: '2024-12-15',
        procedure: 'Rinoplastia',
        title: 'Resultados increíbles, atención profesional',
        content: 'Dr. Mendoza superó mis expectativas. Todo el proceso fue muy profesional, desde la consulta hasta la recuperación. Los resultados se ven muy naturales.',
        verified: true
      },
      {
        id: '2',
        patientName: 'Ana L.',
        rating: 5,
        date: '2024-12-08',
        procedure: 'Aumento de Senos',
        title: 'Profesional y cuidadoso',
        content: 'Excelente cirujano con muy buen trato. Se tomó el tiempo de explicar todo y me hizo sentir cómoda durante todo el proceso.',
        verified: true
      }
    ],

    beforeAfter: [
      {
        id: '1',
        procedure: 'Rinoplastia',
        beforeImage: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
        afterImage: 'https://images.pexels.com/photos/3762799/pexels-photo-3762799.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: '6 meses post-rinoplastia'
      }
    ],

    testimonials: [
      {
        id: '1',
        patientName: 'Laura R.',
        title: 'Experiencia que cambió mi vida',
        videoThumbnail: 'https://images.pexels.com/photos/3845744/pexels-photo-3845744.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '2:34'
      }
    ],

    availability: [
      { date: '2025-01-20', slots: ['09:00', '14:00'] },
      { date: '2025-01-22', slots: ['10:00', '15:00'] },
      { date: '2025-01-25', slots: ['09:00', '11:00', '16:00'] }
    ]
  },
  {
    id: '2',
    name: 'Clínica Dental Medellín',
    title: 'Centro Odontológico Especializado',
    organization: 'Clínica Dental Medellín',
    specialty: 'Dentistry',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
    featured: false,
    rating: 4.8,
    reviewCount: 456,
    experience: 20,
    languages: ['Spanish', 'English'],
    location: 'Medellín, Colombia',
    about: 'Clínica Dental Medellín es una institución odontológica líder con más de 20 años de experiencia. Nuestro equipo de especialistas brinda atención dental integral utilizando la última tecnología.',
    
    procedures: [
      { name: 'Implantes Dentales', price: 2000000, duration: '1-2 horas', description: 'Reemplazo completo de dientes con implantes de titanio' },
      { name: 'Carillas', price: 800000, duration: '1 hora', description: 'Carillas de porcelana para mejorar la sonrisa' },
      { name: 'Blanqueamiento', price: 400000, duration: '1 hora', description: 'Blanqueamiento dental profesional con láser' },
    ],

    clinics: [
      {
        id: '2',
        name: 'Clínica Dental Medellín',
        address: 'Carrera 43A #16-15, El Poblado, Medellín',
        phone: '+57 4 234-5678',
        email: 'info@clinicadentalmedellin.com',
        isPrimary: true,
        amenities: ['Rayos X Digitales', 'Tratamiento Láser', 'Sedación', 'Salas de Recuperación']
      }
    ],

    reviews: [
      {
        id: '3',
        patientName: 'Juan D.',
        rating: 5,
        date: '2024-12-10',
        procedure: 'Implantes Dentales',
        title: 'Excelente servicio y resultados',
        content: 'Personal profesional, instalaciones modernas y excelentes resultados. Los implantes se ven y se sienten naturales.',
        verified: true
      }
    ],

    beforeAfter: [],
    testimonials: [],
    availability: [
      { date: '2025-01-15', slots: ['09:00', '11:00', '14:00'] },
      { date: '2025-01-16', slots: ['10:00', '15:00'] }
    ]
  },
  {
    id: '3',
    name: 'Dr. Andrea Vargas',
    title: 'Especialista en Trasplante Capilar',
    organization: 'Clínica Capilar Cali',
    specialty: 'Trasplante Capilar',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600',
    verified: true,
    featured: true,
    rating: 4.9,
    reviewCount: 189,
    experience: 12,
    languages: ['Spanish', 'English'],
    location: 'Cali, Colombia',
    about: 'Dr. Andrea Vargas es una especialista reconocida en trasplante capilar con más de 12 años de experiencia. Ha realizado miles de procedimientos FUE exitosos.',
    
    procedures: [
      { name: 'Trasplante Capilar FUE', price: 6000000, duration: '6-8 horas', description: 'Trasplante capilar por extracción de unidades foliculares' },
      { name: 'Trasplante de Barba', price: 4500000, duration: '4-6 horas', description: 'Restauración de vello facial' }
    ],

    clinics: [
      {
        id: '3',
        name: 'Clínica Capilar Cali',
        address: 'Avenida 6N #23-45, Granada, Cali',
        phone: '+57 2 345-6789',
        email: 'info@clinicacapilarcali.com',
        isPrimary: true,
        amenities: ['Microscopios', 'Ambiente Estéril', 'Área de Recuperación', 'Consultorios']
      }
    ],

    reviews: [
      {
        id: '4',
        patientName: 'Miguel K.',
        rating: 5,
        date: '2024-11-28',
        procedure: 'Trasplante Capilar FUE',
        title: 'Transformación increíble',
        content: 'Dr. Vargas es una verdadera artista. Los resultados superaron mis expectativas. Equipo profesional y excelente cuidado post-operatorio.',
        verified: true
      }
    ],

    beforeAfter: [
      {
        id: '2',
        procedure: 'Trasplante Capilar FUE',
        beforeImage: 'https://images.pexels.com/photos/3762798/pexels-photo-3762798.jpeg?auto=compress&cs=tinysrgb&w=400',
        afterImage: 'https://images.pexels.com/photos/3762797/pexels-photo-3762797.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: '12 meses post-trasplante FUE'
      }
    ],

    testimonials: [],
    availability: [
      { date: '2025-01-18', slots: ['09:00'] },
      { date: '2025-01-20', slots: ['09:00'] }
    ]
  }
];
