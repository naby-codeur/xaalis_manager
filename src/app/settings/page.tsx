'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Download, 
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Key,
  Monitor,
  Moon,
  Sun
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { language, setLanguage } = useLanguage()

  // États pour les paramètres
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    
    // Sécurité
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    
    // Apparence
    theme: 'system',
    language: 'fr',
    fontSize: 'medium',
    compactMode: false,
    
    // Données
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '2',
    
    // Compte
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Paramètres sauvegardés:', settings)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    // Simulation d'export de données
    console.log('Export des données...')
  }

  const handleDeleteAccount = () => {
    // Simulation de suppression de compte
    console.log('Suppression du compte...')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Paramètres
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Personnalisez votre expérience et gérez vos préférences
              </p>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="data">Données</TabsTrigger>
              <TabsTrigger value="account">Compte</TabsTrigger>
            </TabsList>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Préférences de Notification
                  </CardTitle>
                  <CardDescription>
                    Configurez comment et quand vous recevez des notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notifications par email</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recevoir des notifications importantes par email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Notifications push</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recevoir des notifications sur votre appareil
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">Notifications SMS</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recevoir des alertes critiques par SMS
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Rapports hebdomadaires</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recevoir un résumé hebdomadaire de vos activités
                      </p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked: boolean) => handleSettingChange('weeklyReports', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sécurité */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Sécurité du Compte
                  </CardTitle>
                  <CardDescription>
                    Protégez votre compte avec des paramètres de sécurité avancés
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ajouter une couche de sécurité supplémentaire
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked: boolean) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="session-timeout">Délai d&apos;expiration de session (minutes)</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="password-expiry">Expiration du mot de passe (jours)</Label>
                    <Select
                      value={settings.passwordExpiry}
                      onValueChange={(value) => handleSettingChange('passwordExpiry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="60">60 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="180">180 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Apparence */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Apparence et Langue
                  </CardTitle>
                  <CardDescription>
                    Personnalisez l&apos;apparence de l&apos;interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="theme">Thème</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => handleSettingChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="w-4 h-4 mr-2" />
                            Clair
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="w-4 h-4 mr-2" />
                            Sombre
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Monitor className="w-4 h-4 mr-2" />
                            Système
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select
                      value={language}
                      onValueChange={(value) => setLanguage(value as 'fr' | 'en' | 'ar')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="font-size">Taille de police</Label>
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) => handleSettingChange('fontSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Petite</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-mode">Mode compact</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Réduire l&apos;espacement pour afficher plus de contenu
                      </p>
                    </div>
                    <Switch
                      id="compact-mode"
                      checked={settings.compactMode}
                      onCheckedChange={(checked: boolean) => handleSettingChange('compactMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Données */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Gestion des Données
                  </CardTitle>
                  <CardDescription>
                    Sauvegardez et gérez vos données
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Sauvegarde automatique</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sauvegarder automatiquement vos données
                      </p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={settings.autoBackup}
                      onCheckedChange={(checked: boolean) => handleSettingChange('autoBackup', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="backup-frequency">Fréquence de sauvegarde</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Quotidienne</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Exporter mes données
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer des données
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compte */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Mot de Passe
                  </CardTitle>
                  <CardDescription>
                    Changez votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? 'text' : 'password'}
                        value={settings.currentPassword}
                        onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                    />
                  </div>

                  <Button>
                    <Key className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <Trash2 className="w-5 h-5 mr-2" />
                    Zone Dangereuse
                  </CardTitle>
                  <CardDescription>
                    Actions irréversibles concernant votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-600">Supprimer le compte</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cette action supprimera définitivement votre compte et toutes vos données
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
