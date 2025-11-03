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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-effect border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
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
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="notifications"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white font-medium transition-all duration-300"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white font-medium transition-all duration-300"
              >
                Sécurité
              </TabsTrigger>
              <TabsTrigger 
                value="appearance"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-medium transition-all duration-300"
              >
                Apparence
              </TabsTrigger>
              <TabsTrigger 
                value="data"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-medium transition-all duration-300"
              >
                Données
              </TabsTrigger>
              <TabsTrigger 
                value="account"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white font-medium transition-all duration-300"
              >
                Compte
              </TabsTrigger>
            </TabsList>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-blue-500" />
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
                      className="data-[state=checked]:bg-blue-500"
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
                      className="data-[state=checked]:bg-cyan-500"
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
                      className="data-[state=checked]:bg-green-500"
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
                      className="data-[state=checked]:bg-purple-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sécurité */}
            <TabsContent value="security" className="space-y-6">
              <Card className="border-2 border-red-100 dark:border-red-900 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-500" />
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
                      className="data-[state=checked]:bg-red-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="session-timeout">Délai d&apos;expiration de session (minutes)</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
                    >
                      <SelectTrigger className="border-orange-200 dark:border-orange-800 focus:ring-orange-500 focus:border-orange-500">
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
                      <SelectTrigger className="border-orange-200 dark:border-orange-800 focus:ring-orange-500 focus:border-orange-500">
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
              <Card className="border-2 border-purple-100 dark:border-purple-900 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-purple-500" />
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
                      <SelectTrigger className="border-purple-200 dark:border-purple-800 focus:ring-purple-500 focus:border-purple-500">
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
                      <SelectTrigger className="border-pink-200 dark:border-pink-800 focus:ring-pink-500 focus:border-pink-500">
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
                      <SelectTrigger className="border-purple-200 dark:border-purple-800 focus:ring-purple-500 focus:border-purple-500">
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
                      className="data-[state=checked]:bg-pink-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Données */}
            <TabsContent value="data" className="space-y-6">
              <Card className="border-2 border-indigo-100 dark:border-indigo-900 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-indigo-500" />
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
                      className="data-[state=checked]:bg-indigo-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="backup-frequency">Fréquence de sauvegarde</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                    >
                      <SelectTrigger className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Quotidienne</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button 
                      onClick={handleExportData}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exporter mes données
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Importer des données
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compte */}
            <TabsContent value="account" className="space-y-6">
              <Card className="border-2 border-emerald-100 dark:border-emerald-900 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2 text-emerald-500" />
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

                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                    <Key className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 dark:border-red-800 shadow-lg bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm">
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
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
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
