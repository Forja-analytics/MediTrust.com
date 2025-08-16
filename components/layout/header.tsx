'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';
import { useTranslation } from '@/lib/i18n/use-translation';
import { 
  Heart, 
  Globe, 
  User, 
  MessageSquare, 
  Calendar, 
  Settings,
  LogOut,
  Shield,
  Menu,
  X
} from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, language, setLanguage } = useTranslation();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navigation = [
    { href: '/', label: t('nav.home') },
    { href: '/search', label: t('nav.search') },
    { href: '/providers', label: t('nav.providers') },
    { href: '/about', label: t('nav.about') },
    { href: '/help', label: t('nav.help') }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'provider': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">TrustMed</span>
              <span className="text-xs text-blue-600 -mt-1">Medical Travel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-blue-50' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('es')}
                  className={language === 'es' ? 'bg-blue-50' : ''}
                >
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoUrl || ''} alt={user?.firstName || ''} />
                      <AvatarFallback className="bg-blue-100">
                        {user?.firstName?.[0] || user?.role?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.firstName && (
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      {user?.role && (
                        <Badge variant="secondary" className={`text-xs w-fit ${getRoleColor(user.role)}`}>
                          {user.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {user?.role === 'patient' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          {t('nav.dashboard')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/bookings" className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/messages" className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {t('nav.messages')}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user?.role === 'provider' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Provider Portal
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/bookings" className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Manage Bookings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Console
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('nav.profile')}
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">{t('nav.signIn')}</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/signup">{t('nav.signUp')}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}