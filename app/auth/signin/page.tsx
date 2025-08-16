'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth/auth-context';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError('');

    const result = await signIn(email, password);
    
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      // Redirect based on user role
      const redirectPath = result.user.role === 'admin' 
        ? '/admin' 
        : result.user.role === 'provider'
          ? '/provider/dashboard'
          : '/dashboard';
      
      router.push(redirectPath);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-2xl text-gray-900">TrustMed</span>
              <span className="text-sm text-blue-600 -mt-1">Medical Travel</span>
            </div>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your TrustMed account to continue your medical journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-9 pr-9"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <Link 
                    href="/auth/reset-password" 
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/auth/signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Demo credentials: patient@example.com / provider@example.com / admin@example.com with password: password123<br/><br/>
            By signing in, you agree to our{' '}
            <Link href="/legal/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}