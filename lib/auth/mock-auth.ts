export interface User {
  id: string;
  email: string;
  role: 'patient' | 'provider' | 'nurse' | 'partner' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  preferredLanguage?: string;
  languages?: string[];
  photoUrl?: string;
  isVerified?: boolean;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'patient@example.com',
    role: 'patient',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    country: 'United States',
    preferredLanguage: 'en',
    languages: ['English'],
    isVerified: true
  },
  {
    id: '2',
    email: 'provider@example.com',
    role: 'provider',
    firstName: 'Dr. Maria',
    lastName: 'Rodriguez',
    phone: '+52-55-1234-5678',
    country: 'Mexico',
    preferredLanguage: 'es',
    languages: ['English', 'Spanish'],
    isVerified: true
  },
  {
    id: '3',
    email: 'admin@example.com',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1-555-0199',
    country: 'United States',
    preferredLanguage: 'en',
    languages: ['English'],
    isVerified: true
  }
];

export class MockAuthService {
  private currentUser: User | null = null;
  private isLoading = false;

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    this.isLoading = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      this.currentUser = user;
      localStorage.setItem('mockUser', JSON.stringify(user));
      this.isLoading = false;
      return { user, error: null };
    }
    
    this.isLoading = false;
    return { user: null, error: 'Invalid email or password' };
  }

  async signUp(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
  }): Promise<{ user: User | null; error: string | null }> {
    this.isLoading = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      this.isLoading = false;
      return { user: null, error: 'User already exists' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      preferredLanguage: 'en',
      languages: ['English'],
      isVerified: false
    };
    
    mockUsers.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    
    this.isLoading = false;
    return { user: newUser, error: null };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('mockUser');
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const stored = localStorage.getItem('mockUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    
    return null;
  }

  getLoadingState(): boolean {
    return this.isLoading;
  }
}

export const mockAuth = new MockAuthService();