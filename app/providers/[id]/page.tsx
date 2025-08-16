import { Suspense } from 'react';
import { getProviderById } from '@/lib/mock-data/providers';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  Languages,
  Calendar,
  Clock,
  Award,
  Shield,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Camera,
  Play,
  Users,
  Trophy
} from 'lucide-react';

function ProviderProfileContent({ providerId }: { providerId: string }) {
  const provider = mockProviders.find(p => p.id === providerId);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proveedor No Encontrado</h1>
          <p className="text-gray-600">El proveedor que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              <div className="flex-shrink-0">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  width={160}
                  height={160}
                  className="rounded-xl object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                    {provider.verified && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Proveedor Verificado
                      </Badge>
                    )}
                    {provider.featured && (
                      <Badge className="bg-gold-100 text-gold-800 border-gold-200">
                        <Trophy className="w-4 h-4 mr-1" />
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-gray-700 mb-2">{provider.title}</p>
                  <p className="text-lg text-gray-600">{provider.organization}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-600">({provider.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Award className="h-4 w-4 mr-1" />
                    {provider.experience} años de experiencia
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Languages className="h-4 w-4 mr-1" />
                    {provider.languages.join(', ')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {provider.procedures.slice(0, 4).map((procedure) => (
                    <Badge key={procedure.name} variant="outline" className="bg-blue-50">
                      {procedure.name}
                    </Badge>
                  ))}
                  {provider.procedures.length > 4 && (
                    <Badge variant="outline">+{provider.procedures.length - 4} more</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-1">Desde</p>
                    <p className="text-3xl font-bold text-green-600">${Math.min(...provider.procedures.map(p => p.price)).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Consulta disponible</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reservar Consulta
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar Ahora
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Protegido por TrustMed</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Tu reserva está protegida por nuestra garantía de seguridad integral
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="procedures">Procedures</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">About Dr. {provider.name}</h2>
                    <div className="prose max-w-none">
                      {provider.about.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Credentials & Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Board Certified</h4>
                          <p className="text-sm text-gray-600">Mexican Society of Plastic Surgery</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Medical License</h4>
                          <p className="text-sm text-gray-600">Active & Verified</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">International Member</h4>
                          <p className="text-sm text-gray-600">ISAPS Certified</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <Users className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Patient Volume</h4>
                          <p className="text-sm text-gray-600">3,000+ successful surgeries</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Procedures Tab */}
              <TabsContent value="procedures" className="space-y-6">
                <div className="grid gap-6">
                  {provider.procedures.map((procedure) => (
                    <Card key={procedure.name}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{procedure.name}</h3>
                            <p className="text-gray-600 mt-1">{procedure.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">${procedure.price}</p>
                            <p className="text-sm text-gray-500">{procedure.duration}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>• All inclusive pricing</span>
                            <span>• 1 year follow-up included</span>
                            <span>• Finance options available</span>
                          </div>
                          <Button variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Patient Reviews</h3>
                      <div className="text-center">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold">{provider.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.reviewCount} verified reviews</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {provider.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{review.patientName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">{review.patientName}</h4>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{review.procedure} • {review.date}</p>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Before & After Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {provider.beforeAfter.map((item) => (
                        <div key={item.id} className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Image
                                src={item.beforeImage}
                                alt="Before"
                                width={200}
                                height={200}
                                className="rounded-lg object-cover w-full h-48"
                              />
                              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                Before
                              </div>
                            </div>
                            <div className="relative">
                              <Image
                                src={item.afterImage}
                                alt="After"
                                width={200}
                                height={200}
                                className="rounded-lg object-cover w-full h-48"
                              />
                              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                After
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.procedure}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Patient Testimonials</h3>
                    <div className="grid gap-4">
                      {provider.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="relative rounded-lg overflow-hidden">
                          <Image
                            src={testimonial.videoThumbnail}
                            alt={testimonial.title}
                            width={400}
                            height={225}
                            className="w-full h-56 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Button size="lg" className="rounded-full w-16 h-16">
                              <Play className="h-6 w-6" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="font-medium">{testimonial.patientName}</h4>
                            <p className="text-sm">{testimonial.title}</p>
                            <p className="text-xs opacity-80">{testimonial.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-6">
                {provider.clinics.map((clinic) => (
                  <Card key={clinic.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{clinic.name}</h3>
                          {clinic.isPrimary && (
                            <Badge className="mt-1 bg-blue-100 text-blue-800">
                              Primary Location
                            </Badge>
                          )}
                        </div>
                        <Button variant="outline">
                          Get Directions
                        </Button>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{clinic.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{clinic.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{clinic.email}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {clinic.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Availability Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Available Dates</h3>
                <div className="space-y-3">
                  {provider.availability.map((day) => (
                    <div key={day.date} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-sm mb-2">{day.date}</div>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot) => (
                          <Badge key={slot} variant="outline" className="cursor-pointer hover:bg-blue-50">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProviderProfilePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading provider profile...</div>}>
      <ProviderProfileContent providerId={params.id} />
    </Suspense>
  );
}