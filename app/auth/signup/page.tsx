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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/lib/auth/auth-context';
import { User } from '@/lib/auth/mock-auth';
import { Heart, Mail, Lock, Eye, EyeOff, User, Stethoscope, Building2, Users } from 'lucide-react';

type UserRole = User['role'];

const roleOptions = [
  {
    value: 'patient' as UserRole,
    label: 'Patient',
    description: 'Looking for medical treatments abroad',
    icon: User
  },
  {
    value: 'provider' as UserRole,
    label: 'Healthcare Provider',
    description: 'Doctor, clinic, or medical facility',
    icon: Stethoscope
  },
  {
    value: 'partner' as UserRole,
    label: 'Partner',
    description: 'Hotel, transport, or other service provider',
    icon: Building2
  },
  {
    value: 'nurse' as UserRole,
    label: 'Nurse',
    description: 'Medical professional offering care services',
    icon: Users
  }
];

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'patient' as UserRole
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError('');

    const result = await signUp({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role
    });
    
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      // Redirect based on role
      const redirectPath = formData.role === 'patient' 
        ? '/dashboard' 
        : formData.role === 'provider' 
          ? '/provider/onboarding'
          : formData.role === 'admin'
            ? '/admin'
            : '/dashboard';
      
      router.push(redirectPath);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Join TrustMed to connect with verified healthcare providers worldwide
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
                >
                  {roleOptions.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div key={role.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={role.value} id={role.value} />
                        <Label 
                          htmlFor={role.value} 
                          className="flex items-center space-x-3 cursor-pointer flex-1 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-sm text-gray-600">{role.description}</div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <Separator />

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="First name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Last name"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a password"
                    className="pl-9 pr-9"
                    required
                    disabled={isLoading}
                    minLength={6}
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
                <p className="text-xs text-gray-600">
                  Must be at least 6 characters long
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/auth/signin" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            By creating an account, you agree to our{' '}
            <Link href="/legal/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            . We're committed to protecting your privacy and medical information.
          </p>
        </div>
      </div>
    </div>
  );
}