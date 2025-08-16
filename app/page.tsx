'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Calendar,
  Shield, 
  DollarSign, 
  Clock, 
  Star,
  CheckCircle,
  Users,
  Globe,
  Heart,
  Award,
  ArrowRight,
  Play
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

import { mockProviders } from '@/lib/mock-data/providers';
import { mockDestinations } from '@/lib/mock-data/destinations';

export default function HomePage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Use first 3 providers as featured
  const featuredProviders = mockProviders.slice(0, 3).map(provider => ({
    id: provider.id,
    name: provider.name,
    specialty: provider.specialty,
    location: provider.location,
    rating: provider.rating,
    reviewCount: provider.reviewCount,
    image: provider.image,
    verified: provider.verified,
    languages: provider.languages,
    startingPrice: Math.min(...provider.procedures.map(p => p.price))
  }));

  // Use first 3 destinations as popular
  const popularDestinations = mockDestinations.slice(0, 3);

  const handleSearch = () => {
    // Simple navigation for MVP
    window.location.href = '/search';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {t('home.hero.trustBadge')}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t('home.hero.title')}
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  {t('home.hero.subtitle')}
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search procedures..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 bg-white/90 border-white/30 focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Destination..."
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="pl-10 h-12 bg-white/90 border-white/30 focus:bg-white"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg" 
                  className="w-full h-12 bg-white text-blue-600 hover:bg-gray-50 font-semibold"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-200" />
                  <span>Verified Providers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-blue-200" />
                  <span>4.8/5 Average Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-200" />
                  <span>50,000+ Patients</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Featured Provider</h3>
                  <Badge className="bg-green-500 text-white">Online Now</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Image
                    src={featuredProviders[0].image}
                    alt={featuredProviders[0].name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{featuredProviders[0].name}</h4>
                    <p className="text-blue-100">{featuredProviders[0].specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{featuredProviders[0].rating} ({featuredProviders[0].reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="text-blue-100">Starting from</span>
                  <span className="text-2xl font-bold">${featuredProviders[0].startingPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built a platform that prioritizes your safety, transparency, and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.verification.title')}</h3>
                <p className="text-gray-600">{t('home.features.verification.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.transparent.title')}</h3>
                <p className="text-gray-600">{t('home.features.transparent.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.support.title')}</h3>
                <p className="text-gray-600">{t('home.features.support.description')}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.secure.title')}</h3>
                <p className="text-gray-600">{t('home.features.secure.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Medical Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore world-class healthcare in beautiful destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDestinations.map((destination) => (
              <Card key={`${destination.country}-${destination.city}`} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      {destination.savings} savings
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {destination.city}, {destination.country}
                  </h3>
                  <p className="text-gray-600 mb-4">{destination.providers} verified providers</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.procedures.map((procedure) => (
                      <Badge key={procedure} variant="secondary">
                        {procedure}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Explore Providers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top-Rated Medical Providers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our verified healthcare professionals with outstanding patient reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={provider.image}
                        alt={provider.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{provider.name}</h3>
                        <p className="text-gray-600">{provider.specialty}</p>
                      </div>
                    </div>
                    {provider.verified && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {provider.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-gray-600 ml-1">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-sm text-gray-600">Starting from</span>
                      <p className="text-xl font-bold text-green-600">${provider.startingPrice}</p>
                    </div>
                    <Button size="sm">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/providers">
                View All Providers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of patients who have found quality, affordable healthcare worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50" asChild>
                <Link href="/search">
                  Find Your Treatment
                  <Search className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/providers/join">
                  Join as Provider
                  <Heart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}