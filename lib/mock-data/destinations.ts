export interface Destination {
  country: string;
  city: string;
  image: string;
  procedures: string[];
  savings: string;
  providers: number;
}

export const mockDestinations: Destination[] = [
  {
    country: 'Colombia',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=600',
    procedures: ['Dental', 'Cirugía Cosmética', 'Cirugía Bariátrica'],
    savings: 'Hasta 60%',
    providers: 45
  },
  {
    country: 'Colombia',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600',
    procedures: ['Dental', 'Cirugía Cosmética', 'Cirugía Cardíaca'],
    savings: 'Hasta 65%',
    providers: 62
  },
  {
    country: 'Colombia',
    city: 'Cali',
    image: 'https://images.pexels.com/photos/1524107/pexels-photo-1524107.jpeg?auto=compress&cs=tinysrgb&w=600',
    procedures: ['Trasplante Capilar', 'Cirugía Ocular', 'Dental'],
    savings: 'Hasta 55%',
    providers: 38
  }
];