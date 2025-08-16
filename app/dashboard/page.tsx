'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth/auth-context';
import { useTranslation } from '@/lib/i18n/use-translation';
import { mockUpcomingAppointments, mockRecentMessages, mockBookingHistory } from '@/lib/mock-data/dashboard';
import { 
  Calendar,
  MessageSquare,
  FileText,
  CreditCard,
  Star,
  Clock,
  MapPin,
  Phone,
  Video,
  Plus,
  ArrowRight,
  Bell,
  Heart,
  Shield
} from 'lucide-react';

export default function PatientDashboard() {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth/signin';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('dashboard.welcome')}, {user?.firstName || 'there'}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your medical journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button asChild>
                <Link href="/search">
                  <Plus className="h-4 w-4 mr-2" />
                  Find Treatment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{mockUpcomingAppointments.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockRecentMessages.filter(m => m.unread).length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockBookingHistory.filter(b => b.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Saved</p>
                  <p className="text-2xl font-bold text-green-600">$12,450</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t('dashboard.upcomingAppointments')}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/bookings">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mockUpcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No upcoming appointments</p>
                    <Button asChild>
                      <Link href="/search">Book Your First Treatment</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockUpcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <Image
                          src={appointment.providerImage}
                          alt={appointment.providerName}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{appointment.procedure}</h3>
                              <p className="text-gray-600">{appointment.providerName}</p>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {appointment.date} at {appointment.time}
                            </div>
                            <div className="flex items-center">
                              {appointment.type === 'virtual' ? (
                                <Video className="h-4 w-4 mr-1" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-1" />
                              )}
                              {appointment.type === 'virtual' ? 'Virtual' : appointment.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {appointment.type === 'virtual' && (
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4 mr-1" />
                              Join
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t('dashboard.recentMessages')}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/messages">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Avatar>
                        <AvatarImage src={message.providerImage} />
                        <AvatarFallback>{message.providerName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium truncate">{message.providerName}</h4>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/search">
                      <Plus className="h-4 w-4 mr-2" />
                      Find Treatment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/messages">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/documents">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/payments">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment History
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booking History */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t('dashboard.bookingHistory')}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/bookings/history">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookingHistory.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{booking.procedure}</h4>
                        <p className="text-sm text-gray-600">{booking.providerName}</p>
                        <p className="text-xs text-gray-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.amount}</p>
                        {booking.canReview && (
                          <Button size="sm" variant="outline" className="mt-1">
                            <Star className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Protected Payments</p>
                      <p className="text-xs text-gray-600">Your payments are secure</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Star className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Verified Providers</p>
                      <p className="text-xs text-gray-600">All providers are verified</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">24/7 Support</p>
                      <p className="text-xs text-gray-600">We're always here to help</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}