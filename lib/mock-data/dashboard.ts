export interface Appointment {
  id: string;
  providerName: string;
  specialty: string;
  procedure: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-person';
  location: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  providerImage: string;
}

export interface Message {
  id: string;
  providerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  providerImage: string;
}

export interface BookingHistory {
  id: string;
  providerName: string;
  procedure: string;
  date: string;
  status: 'completed' | 'cancelled';
  amount: number;
  canReview: boolean;
}

export const mockUpcomingAppointments: Appointment[] = [
  {
    id: '1',
    providerName: 'Dr. Carlos Mendoza',
    specialty: 'Cirugía Cosmética',
    procedure: 'Consulta Rinoplastia',
    date: '2025-01-20',
    time: '14:00',
    type: 'virtual',
    location: 'Bogotá, Colombia',
    status: 'confirmed',
    providerImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    providerName: 'Clínica Dental Medellín',
    specialty: 'Odontología',
    procedure: 'Consulta Implantes Dentales',
    date: '2025-01-25',
    time: '10:00',
    type: 'in-person',
    location: 'Medellín, Colombia',
    status: 'pending',
    providerImage: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const mockRecentMessages: Message[] = [
  {
    id: '1',
    providerName: 'Dr. Carlos Mendoza',
    lastMessage: 'Gracias por sus preguntas. Le he enviado las instrucciones pre-quirúrgicas.',
    timestamp: 'hace 2 horas',
    unread: true,
    providerImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    providerName: 'Clínica Dental Medellín',
    lastMessage: 'Su consulta está confirmada para la próxima semana. Por favor traiga sus radiografías.',
    timestamp: 'hace 1 día',
    unread: false,
    providerImage: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const mockBookingHistory: BookingHistory[] = [
  {
    id: '1',
    providerName: 'Dr. Luis García',
    procedure: 'Consulta Cardiológica',
    date: '2024-12-15',
    status: 'completed',
    amount: 350000,
    canReview: true
  },
  {
    id: '2',
    providerName: 'Clínica Capilar Cali',
    procedure: 'Consulta Trasplante Capilar',
    date: '2024-11-28',
    status: 'completed',
    amount: 250000,
    canReview: false
  }
];