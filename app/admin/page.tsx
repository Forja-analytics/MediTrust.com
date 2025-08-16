'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth/auth-context';
import { mockAdminStats, mockPendingVerifications, mockAdminActivity } from '@/lib/mock-data/admin';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  CreditCard,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      window.location.href = '/';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'provider_approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'dispute_resolved': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'sanction_applied': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Console</h1>
          <p className="text-gray-600">Manage platform operations and user safety</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Providers</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.activeProviders}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-600">{mockAdminStats.pendingVerifications}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.monthlyBookings}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${mockAdminStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Disputes</p>
                  <p className="text-2xl font-bold text-red-600">${mockAdminStats.disputesOpen}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="verification">Verification Queue</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="sanctions">Sanctions</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Verification Queue */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Verification Queue</CardTitle>
                <CardDescription>
                  Review and approve healthcare provider applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{verification.providerName}</h3>
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            {verification.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{verification.organization}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>{verification.location}</span>
                          <span>Submitted: {verification.submittedDate}</span>
                          <span>{verification.documentsCount} documents</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes */}
          <TabsContent value="disputes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>
                  Manage and resolve disputes between patients and providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active disputes require attention</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sanctions */}
          <TabsContent value="sanctions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Sanctions</CardTitle>
                <CardDescription>
                  Manage warnings, suspensions, and bans for providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">All providers are in good standing</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Admin Activity</CardTitle>
                <CardDescription>
                  Track recent actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                          <span>{activity.timestamp}</span>
                          <span>•</span>
                          <span>by {activity.actor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue analytics coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}