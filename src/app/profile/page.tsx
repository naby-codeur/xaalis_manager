'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit, 
  Save, 
  X,
  Camera,
  Bell,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  // Données utilisateur simulées
  const [userData, setUserData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@xaliss.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris, France',
    role: 'Administrateur',
    organization: 'Xaliss Manager',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20 14:30',
    avatar: '/images/default-avatar.png'
  })

  const [editData, setEditData] = useState(userData)

  const handleEdit = () => {
    setEditData(userData)
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUserData(editData)
      setIsEditing(false)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mon Profil
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos informations personnelles et vos préférences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <Button onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations Personnelles
              </CardTitle>
              <CardDescription>
                Vos informations de base et de contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar et nom */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={userData.avatar} alt="Avatar" />
                    <AvatarFallback className="text-lg">
                      {getInitials(userData.firstName, userData.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={editData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={editData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {userData.firstName} {userData.lastName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {userData.role} • {userData.organization}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations de contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="flex items-center mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userData.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Téléphone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userData.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address" className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Adresse
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userData.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations du compte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Informations du Compte
              </CardTitle>
              <CardDescription>
                Détails de votre compte et de votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center mb-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Rôle
                  </Label>
                  <Badge variant="secondary" className="text-sm">
                    {userData.role}
                  </Badge>
                </div>

                <div>
                  <Label className="flex items-center mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    Organisation
                  </Label>
                  <p className="text-gray-900 dark:text-white">{userData.organization}</p>
                </div>

                <div>
                  <Label className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Membre depuis
                  </Label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(userData.joinDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div>
                  <Label className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Dernière connexion
                  </Label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(userData.lastLogin).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Bell className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gérer vos préférences de notification
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Lock className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Sécurité
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Changer votre mot de passe
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Facturation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gérer votre abonnement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

