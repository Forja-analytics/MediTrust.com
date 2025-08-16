'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  MapPin,
  Star,
  Filter,
  CheckCircle,
  DollarSign,
  Calendar,
  Languages,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { mockProviders } from '@/lib/mock-data/providers';

function SearchContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Search filters state
  const [filters, setFilters] = useState({
    procedure: searchParams?.get('procedure') || '',
    location: searchParams?.get('location') || '',
    priceRange: [0, 20000],
    rating: 4.0,
    languages: [] as string[],
    specialties: [] as string[],
    sortBy: 'relevance',
  });

  const [filteredProviders, setFilteredProviders] = useState(mockProviders);

  // Filter providers based on current filters
  useEffect(() => {
    // Simple filtering for MVP
    let filtered = [...mockProviders];

    if (filters.procedure) {
      filtered = filtered.filter((provider) =>
        provider.specialty
          .toLowerCase()
          .includes(filters.procedure.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((provider) =>
        provider.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  }, [filters]);

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      languages: checked
        ? [...prev.languages, language]
        : prev.languages.filter((lang) => lang !== language),
    }));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      specialties: checked
        ? [...prev.specialties, specialty]
        : prev.specialties.filter((spec) => spec !== specialty),
    }));
  };

  const clearFilters = () => {
    setFilters({
      procedure: '',
      location: '',
      priceRange: [0, 20000],
      rating: 4.0,
      languages: [],
      specialties: [],
      sortBy: 'relevance',
    });
  };

  const specialties = [
    'Cosmetic Surgery',
    'Dentistry',
    'Hair Transplant',
    'Cardiology',
    'Orthopedics',
  ];
  const languages = [
    'English',
    'Spanish',
    'Thai',
    'Turkish',
    'German',
    'Chinese',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('search.filters.procedure')}
                  value={filters.procedure}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      procedure: e.target.value,
                    }))
                  }
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('search.filters.location')}
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="pl-10"
                />
              </div>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, sortBy: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">
                    {t('search.results.sort.relevance')}
                  </SelectItem>
                  <SelectItem value="price">
                    {t('search.results.sort.price')}
                  </SelectItem>
                  <SelectItem value="rating">
                    {t('search.results.sort.rating')}
                  </SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:w-auto w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.languages.length > 0 ||
                filters.specialties.length > 0) && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  {filters.languages.length + filters.specialties.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              isFiltersOpen ? 'block' : 'hidden'
            } md:block w-full md:w-80 space-y-6`}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('search.filters.priceRange')}: ${filters.priceRange[0]}{' '}
                      - ${filters.priceRange[1]}
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, priceRange: value }))
                      }
                      max={20000}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('search.filters.rating')}: {filters.rating}+
                    </label>
                    <Slider
                      value={[filters.rating]}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, rating: value[0] }))
                      }
                      min={1}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Specialties */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Specialties
                    </label>
                    <div className="space-y-2">
                      {specialties.map((specialty) => (
                        <div
                          key={specialty}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`specialty-${specialty}`}
                            checked={filters.specialties.includes(specialty)}
                            onCheckedChange={(checked) =>
                              handleSpecialtyChange(
                                specialty,
                                checked as boolean
                              )
                            }
                          />
                          <label
                            htmlFor={`specialty-${specialty}`}
                            className="text-sm"
                          >
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('search.filters.language')}
                    </label>
                    <div className="space-y-2">
                      {languages.map((language) => (
                        <div
                          key={language}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`language-${language}`}
                            checked={filters.languages.includes(language)}
                            onCheckedChange={(checked) =>
                              handleLanguageChange(language, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`language-${language}`}
                            className="text-sm"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredProviders.length} {t('search.results.found')}
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {filteredProviders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <Search className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="text-lg font-semibold">
                      {t('search.noResults.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('search.noResults.description')}
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={provider.image}
                            alt={provider.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-semibold">
                                  {provider.name}
                                </h3>
                                {provider.verified && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600">
                                {provider.organization}
                              </p>
                              <p className="text-sm text-gray-500">
                                {provider.specialty} • {provider.experience}{' '}
                                years experience
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                  {provider.rating}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  ({provider.reviewCount})
                                </span>
                              </div>
                              <p className="text-2xl font-bold text-green-600">
                                $
                                {Math.min(
                                  ...provider.procedures.map((p) => p.price)
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                Starting from
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {provider.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Next:{' '}
                              {provider.availability[0]?.date ||
                                'Contact for availability'}
                            </div>
                            <div className="flex items-center">
                              <Languages className="h-4 w-4 mr-1" />
                              {provider.languages.join(', ')}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {provider.procedures
                              .slice(0, 3)
                              .map((procedure) => (
                                <Badge key={procedure} variant="outline">
                                  {procedure.name}
                                </Badge>
                              ))}
                            {provider.procedures.length > 3 && (
                              <Badge variant="outline">
                                +{provider.procedures.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-3 pt-2">
                            <Button asChild className="flex-1">
                              <Link href={`/providers/${provider.id}`}>
                                View Profile
                              </Link>
                            </Button>
                            <Button variant="outline">Send Message</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
