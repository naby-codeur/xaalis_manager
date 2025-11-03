'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Calendar, Filter, Search } from 'lucide-react'

type SourceType = 'GRANT' | 'DONATION' | 'CONTRIBUTION' | 'PARTNERSHIP' | 'SALE'

interface ResourceEntry {
  id: string
  type: SourceType
  label: string
  origin: string // Origine/Donateur
  amount: number
  date: string // Date au format YYYY-MM-DD
}

interface ContributionEntry {
  id: string
  memberName: string
  amount: number
  date: string
}

export default function ResourcesPage() {
  // Données initiales avec origines et dates
  const [resources, setResources] = useState<ResourceEntry[]>([
    { id: '1', type: 'GRANT', label: 'Subvention UNICEF', origin: 'UNICEF', amount: 5000000, date: '2024-01-15' },
    { id: '2', type: 'GRANT', label: 'Subvention PNUD', origin: 'PNUD', amount: 3500000, date: '2024-01-10' },
    { id: '3', type: 'DONATION', label: 'Don', origin: 'Fondation Orange', amount: 800000, date: '2024-01-12' },
    { id: '4', type: 'DONATION', label: 'Don', origin: 'Jean Dupont', amount: 400000, date: '2024-01-08' },
    { id: '5', type: 'CONTRIBUTION', label: 'Cotisation mensuelle', origin: 'Aminata Diallo', amount: 25000, date: '2024-01-05' },
    { id: '6', type: 'CONTRIBUTION', label: 'Cotisation mensuelle', origin: 'Mohamed Traoré', amount: 30000, date: '2024-01-05' },
    { id: '7', type: 'PARTNERSHIP', label: 'Partenariat', origin: 'Entreprise ABC', amount: 600000, date: '2024-01-14' },
    { id: '8', type: 'SALE', label: 'Vente', origin: 'Événement caritatif', amount: 300000, date: '2024-01-20' },
  ])

  const [newResource, setNewResource] = useState<{ 
    type: SourceType
    origin: string
    amount: string
    date: string
  }>({ 
    type: 'GRANT', 
    origin: '', 
    amount: '', 
    date: new Date().toISOString().split('T')[0] 
  })

  const [contributions, setContributions] = useState<ContributionEntry[]>([])
  const [newContribution, setNewContribution] = useState<{ 
    memberName: string
    amount: string
    date: string
  }>({ 
    memberName: '', 
    amount: '',
    date: new Date().toISOString().split('T')[0]
  })

  // Filtres
  const [filterType, setFilterType] = useState<SourceType | 'ALL'>('ALL')
  const [filterDateFrom, setFilterDateFrom] = useState<string>('')
  const [filterDateTo, setFilterDateTo] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const getSourceLabel = (type: SourceType) => {
    const labels: Record<SourceType, string> = {
      'GRANT': 'Subvention',
      'DONATION': 'Don',
      'CONTRIBUTION': 'Cotisation mensuelle',
      'PARTNERSHIP': 'Partenariat',
      'SALE': 'Vente'
    }
    return labels[type]
  }

  const addResource = () => {
    const amt = Number(newResource.amount)
    if (!amt || amt <= 0 || !newResource.origin.trim() || !newResource.date) return
    
    const newEntry: ResourceEntry = {
      id: crypto.randomUUID(),
      type: newResource.type,
      label: getSourceLabel(newResource.type),
      origin: newResource.origin.trim(),
      amount: amt,
      date: newResource.date
    }
    
    setResources(prev => [...prev, newEntry])
    setNewResource({ 
      type: newResource.type, 
      origin: '', 
      amount: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const removeResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  const addContribution = () => {
    const amt = Number(newContribution.amount)
    if (!newContribution.memberName.trim() || !amt || amt <= 0 || !newContribution.date) return
    
    const newEntry: ContributionEntry = {
      id: crypto.randomUUID(),
      memberName: newContribution.memberName.trim(),
      amount: amt,
      date: newContribution.date
    }
    
    setContributions(prev => [...prev, newEntry])
    
    // Ajouter aussi comme ressource CONTRIBUTION
    const resourceEntry: ResourceEntry = {
      id: crypto.randomUUID(),
      type: 'CONTRIBUTION',
      label: 'Cotisation mensuelle',
      origin: newContribution.memberName.trim(),
      amount: amt,
      date: newContribution.date
    }
    setResources(prev => [...prev, resourceEntry])
    
    setNewContribution({ 
      memberName: '', 
      amount: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const removeContribution = (id: string) => {
    const entry = contributions.find(c => c.id === id)
    setContributions(prev => prev.filter(c => c.id !== id))
    
    // Retirer aussi de resources
    if (entry) {
      setResources(prev => prev.filter(r => 
        !(r.type === 'CONTRIBUTION' && r.origin === entry.memberName && r.amount === entry.amount && r.date === entry.date)
      ))
    }
  }

  // Calculer les totaux par type
  const totalsByType = resources.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + r.amount
    return acc
  }, {} as Record<SourceType, number>)

  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    const matchesType = filterType === 'ALL' || resource.type === filterType
    const matchesSearch = searchTerm === '' || 
      resource.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDateFrom = !filterDateFrom || resource.date >= filterDateFrom
    const matchesDateTo = !filterDateTo || resource.date <= filterDateTo
    
    return matchesType && matchesSearch && matchesDateFrom && matchesDateTo
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'XOF', 
      minimumFractionDigits: 0 
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeColor = (type: SourceType) => {
    const colors: Record<SourceType, string> = {
      'GRANT': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'DONATION': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'CONTRIBUTION': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'PARTNERSHIP': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'SALE': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    }
    return colors[type]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-effect border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Ressources
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez vos dons, subventions, cotisations et autres sources de revenus
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {(['GRANT', 'DONATION', 'CONTRIBUTION', 'PARTNERSHIP', 'SALE'] as SourceType[]).map(type => (
            <Card key={type} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {getSourceLabel(type)}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(totalsByType[type] || 0)}
                    </p>
                  </div>
                  <Badge className={getTypeColor(type)}>
                    {resources.filter(r => r.type === type).length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtres */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label>Recherche</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par origine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Type</Label>
                <Select value={filterType} onValueChange={(v) => setFilterType(v as SourceType | 'ALL')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tous les types</SelectItem>
                    <SelectItem value="GRANT">Subvention</SelectItem>
                    <SelectItem value="DONATION">Don</SelectItem>
                    <SelectItem value="CONTRIBUTION">Cotisation</SelectItem>
                    <SelectItem value="PARTNERSHIP">Partenariat</SelectItem>
                    <SelectItem value="SALE">Vente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date de début</Label>
                <Input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Date de fin</Label>
                <Input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ajouter une ressource */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle>Ajouter une ressource</CardTitle>
              <CardDescription>Ajoutez une nouvelle source de revenus avec son origine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Type</Label>
                    <Select value={newResource.type} onValueChange={(v) => setNewResource({ ...newResource, type: v as SourceType })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GRANT">Subvention</SelectItem>
                        <SelectItem value="DONATION">Don</SelectItem>
                        <SelectItem value="CONTRIBUTION">Cotisation</SelectItem>
                        <SelectItem value="PARTNERSHIP">Partenariat</SelectItem>
                        <SelectItem value="SALE">Vente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newResource.date}
                      onChange={e => setNewResource({ ...newResource, date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Origine / Donateur</Label>
                  <Input
                    placeholder="Ex: UNICEF, Jean Dupont, Fondation X..."
                    value={newResource.origin}
                    onChange={e => setNewResource({ ...newResource, origin: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Montant (FCFA)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newResource.amount}
                      onChange={e => setNewResource({ ...newResource, amount: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                      onClick={addResource}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ajouter une cotisation */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle>Cotisations mensuelles</CardTitle>
              <CardDescription>Ajoutez les membres ayant cotisé et les montants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <Label>Nom du membre</Label>
                    <Input
                      placeholder="Ex: Aminata Diallo"
                      value={newContribution.memberName}
                      onChange={e => setNewContribution({ ...newContribution, memberName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newContribution.date}
                      onChange={e => setNewContribution({ ...newContribution, date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Montant (FCFA)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newContribution.amount}
                      onChange={e => setNewContribution({ ...newContribution, amount: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={addContribution}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter la cotisation
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {contributions.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      Aucune cotisation ajoutée pour le moment.
                    </p>
                  )}
                  {contributions.map((c) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{c.memberName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(c.amount)}
                          </p>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(c.date)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => removeContribution(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des ressources */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Liste des Ressources ({filteredResources.length})</CardTitle>
            <CardDescription>
              Toutes vos sources de revenus avec leurs origines et dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucune ressource trouvée avec les filtres sélectionnés.
                  </p>
                </div>
              ) : (
                filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md hover-lift transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.label}
                        </Badge>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resource.origin}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(resource.date)}
                        </div>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          {formatCurrency(resource.amount)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ml-4"
                      onClick={() => removeResource(resource.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
