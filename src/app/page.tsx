'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Smartphone, 
  BarChart3,
  Users,
  CreditCard,
  FileText,
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

const features = [
  {
    icon: Shield,
    title: 'Sécurité Avancée',
    description: 'Chiffrement de bout en bout et authentification multi-facteurs pour protéger vos données financières.'
  },
  {
    icon: Globe,
    title: 'Multilingue',
    description: 'Interface disponible en français, anglais et arabe pour une accessibilité mondiale.'
  },
  {
    icon: Smartphone,
    title: 'PWA Mobile',
    description: 'Application web progressive fonctionnant hors ligne sur tous vos appareils mobiles.'
  },
  {
    icon: BarChart3,
    title: 'Rapports Intelligents',
    description: 'Analyses et rapports automatiques avec intelligence artificielle intégrée.'
  },
  {
    icon: Users,
    title: 'Gestion d\'Équipe',
    description: 'Rôles et permissions personnalisables pour une collaboration sécurisée.'
  },
  {
    icon: CreditCard,
    title: 'Transactions',
    description: 'Suivi complet des revenus et dépenses avec catégorisation automatique.'
  }
]

const testimonials = [
  {
    name: 'Aminata Diallo',
    role: 'Directrice, ONG Santé Plus',
    content: 'Xaliss Manager a révolutionné notre gestion financière. La transparence et la facilité d\'utilisation sont exceptionnelles.',
    rating: 5
  },
  {
    name: 'Jean-Pierre Martin',
    role: 'Trésorier, Association Solidarité',
    content: 'L\'interface multilingue et les rapports automatiques nous font gagner un temps précieux.',
    rating: 5
  },
  {
    name: 'Fatima Al-Zahra',
    role: 'Gestionnaire, Fondation Education',
    content: 'La sécurité des données et la fonctionnalité PWA sont parfaites pour notre équipe internationale.',
    rating: 5
  }
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/images/logo_xm.png"
                  alt="Xaliss Manager Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Xaliss Manager
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Fonctionnalités
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Témoignages
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Tarifs
              </button>
              
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'ar')}
                className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇺🇸 EN</option>
                <option value="ar">🇸🇦 AR</option>
              </select>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Inscription</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Documentation</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2 space-y-2">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Fonctionnalités
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Témoignages
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Tarifs
              </button>
              <div className="px-3 py-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'ar')}
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm"
                >
                  <option value="fr">🇫🇷 Français</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="ar">🇸🇦 العربية</option>
                </select>
              </div>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Inscription</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/docs">Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 Nouvelle version disponible
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Gestion Financière
              <span className="text-blue-600"> Intelligente</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Application PWA de gestion des dépenses et ressources pour ONG, associations et PME. 
              Transparence, sécurité et IA intégrée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">
                  Se connecter
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </Button>
            </div>
            <div className="mt-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ChevronDown className="h-6 w-6 mx-auto animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fonctionnalités Puissantes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tout ce dont vous avez besoin pour une gestion financière transparente
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Plus de 1000 organisations nous font confiance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d&apos;organisations qui font confiance à Xaliss Manager
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/login">
                Se connecter
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/images/logo_xm.png"
                    alt="Xaliss Manager Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-bold text-xl">Xaliss Manager</span>
              </div>
              <p className="text-gray-400">
                Gestion financière intelligente pour les organisations modernes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Centre d&apos;aide</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Statut</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white">Conditions</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Xaliss Manager. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}