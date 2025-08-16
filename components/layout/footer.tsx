import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useStaticTranslation } from '@/lib/i18n/use-translation';

interface FooterProps {
  language?: 'en' | 'es';
}

export function Footer({ language = 'en' }: FooterProps) {
  const { t } = useStaticTranslation(language);

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Safety Standards', href: '/safety' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Medical Emergencies', href: '/emergency' },
      { label: 'Insurance Claims', href: '/claims' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms of Service', href: '/legal/terms-of-service' },
      { label: 'Medical Disclaimer', href: '/legal/medical-disclaimer' },
      { label: 'Refund Policy', href: '/legal/refund-policy' }
    ],
    providers: [
      { label: 'Join as Provider', href: '/providers/join' },
      { label: 'Provider Resources', href: '/providers/resources' },
      { label: 'Verification Process', href: '/providers/verification' },
      { label: 'Provider Support', href: '/providers/support' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">TrustMed</span>
                <span className="text-sm text-blue-400">Medical Travel</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting patients with verified healthcare providers worldwide. 
              Quality medical care at affordable prices with comprehensive travel support.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@trustmed.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available worldwide, 24/7 support</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Providers</h3>
            <ul className="space-y-2">
              {footerLinks.providers.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TrustMed. All rights reserved.
            </p>
            
            <div className="text-gray-400 text-sm mt-2 md:mt-0">
              <span className="inline-flex items-center">
                <span className="mr-1">Made with</span>
                <Heart className="h-3 w-3 text-red-500" />
                <span className="ml-1">for global healthcare access</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}