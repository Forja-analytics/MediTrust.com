export interface AdminStats {
  totalUsers: number;
  activeProviders: number;
  pendingVerifications: number;
  monthlyBookings: number;
  totalRevenue: number;
  disputesOpen: number;
}

export interface PendingVerification {
  id: string;
  providerName: string;
  organization: string;
  location: string;
  submittedDate: string;
  documentsCount: number;
  status: 'under_review' | 'pending';
}

export interface AdminActivity {
  id: string;
  type: 'provider_approved' | 'dispute_resolved' | 'sanction_applied';
  description: string;
  timestamp: string;
  actor: string;
}

export const mockAdminStats: AdminStats = {
  totalUsers: 12450,
  activeProviders: 234,
  pendingVerifications: 18,
  monthlyBookings: 1890,
  totalRevenue: 245670,
  disputesOpen: 7
};

export const mockPendingVerifications: PendingVerification[] = [
  {
    id: '1',
    providerName: 'Dr. Patricia Herrera',
    organization: 'Clínica Dental Herrera',
    location: 'Cartagena, Colombia',
    submittedDate: '2025-01-15',
    documentsCount: 8,
    status: 'under_review'
  },
  {
    id: '2',
    providerName: 'Centro Oftalmológico Barranquilla',
    organization: 'Grupo Médico del Caribe',
    location: 'Barranquilla, Colombia',
    submittedDate: '2025-01-14',
    documentsCount: 12,
    status: 'pending'
  }
];

export const mockAdminActivity: AdminActivity[] = [
  {
    id: '1',
    type: 'provider_approved',
    description: 'Dr. Carlos Mendoza aprobado para cirugía cosmética',
    timestamp: 'hace 2 horas',
    actor: 'Usuario Admin'
  },
  {
    id: '2',
    type: 'dispute_resolved',
    description: 'Disputa de reserva #1234 resuelta a favor del paciente',
    timestamp: 'hace 4 horas',
    actor: 'Equipo de Soporte'
  },
  {
    id: '3',
    type: 'sanction_applied',
    description: 'Advertencia emitida a Clínica Medellín por respuesta tardía',
    timestamp: 'hace 1 día',
    actor: 'Equipo de Calidad'
  }
];