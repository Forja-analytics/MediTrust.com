'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, mockAuth } from '@/lib/auth/mock-auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
  }) => Promise<{ user: User | null; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await mockAuth.signIn(email, password);
    if (result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
  }) => {
    setLoading(true);
    const result = await mockAuth.signUp(userData);
    if (result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    await mockAuth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const u = await mockAuth.getCurrentUser();
      setUser(u);
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
