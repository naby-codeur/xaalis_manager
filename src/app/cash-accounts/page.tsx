'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Wallet, 
  Eye,
  Edit,
  Trash2,
  DollarSign,
  CreditCard
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Données de démonstration
const cashAccounts = [
  {
    id: 1,
    name: 'Caisse Principale',
    description: 'Caisse principale de l\'organisation',
    balance: 2450000,
    currency: 'XOF',
    project: 'Projet Santé',
    status: 'active',
    lastTransaction: '2024-01-15',
    transactionsCount: 45
  },
  {
    id: 2,
    name: 'Caisse Transport',
    description: 'Fonds dédiés aux frais de transport',
    balance: 450000,
    currency: 'XOF',
    project: 'Projet Education',
    status: 'active',
    lastTransaction: '2024-01-14',
    transactionsCount: 23
  },
  {
    id: 3,
    name: 'Caisse Urgence',
    description: 'Fonds d\'urgence pour situations critiques',
    balance: 1200000,
    currency: 'XOF',
    project: null,
    status: 'active',
    lastTransaction: '2024-01-10',
    transactionsCount: 8
  },
  {
    id: 4,
    name: 'Caisse Projet Eau',
    description: 'Fonds pour le projet d\'accès à l\'eau',
    balance: 0,
    currency: 'XOF',
    project: 'Projet Eau',
    status: 'inactive',
    lastTransaction: '2023-12-20',
    transactionsCount: 156
  }
]

const projects = [
  { id: 1, name: 'Projet Santé', status: 'active' },
  { id: 2, name: 'Projet Education', status: 'active' },
  { id: 3, name: 'Projet Eau', status: 'completed' },
  { id: 4, name: 'Projet Agriculture', status: 'planned' }
]

export default function CashAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const formatCurrency = (amount: number, currency: string = 'XOF') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'inactive':
        return 'Inactif'
      case 'suspended':
        return 'Suspendu'
      default:
        return 'Inconnu'
    }
  }

  const filteredAccounts = cashAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = selectedProject === 'all' || account.project === selectedProject
    const matchesStatus = selectedStatus === 'all' || account.status === selectedStatus
    
    return matchesSearch && matchesProject && matchesStatus
  })

  const totalBalance = cashAccounts.reduce((sum, account) => sum + account.balance, 0)
  const activeAccounts = cashAccounts.filter(account => account.status === 'active').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-effect border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestion des Caisses
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos comptes de trésorerie et suivez les soldes
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Caisse
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Solde Total
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalBalance)}
                  </p>
                </div>
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-xl shadow-lg">
                  <DollarSign className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Caisses Actives
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeAccounts}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total des Caisses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cashAccounts.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher une caisse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les projets</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="suspended">Suspendu</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des caisses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover-lift border-0 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                        <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{account.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {account.description}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Solde */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Solde</span>
                      <span className={`text-xl font-bold ${
                        account.balance >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {formatCurrency(account.balance, account.currency)}
                      </span>
                    </div>

                    {/* Projet */}
                    {account.project && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Projet</span>
                        <Badge variant="outline">{account.project}</Badge>
                      </div>
                    )}

                    {/* Statut */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Statut</span>
                      <Badge className={getStatusColor(account.status)}>
                        {getStatusLabel(account.status)}
                      </Badge>
                    </div>

                    {/* Dernière transaction */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Dernière transaction</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(account.lastTransaction).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    {/* Nombre de transactions */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Transactions</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.transactionsCount}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Message si aucune caisse trouvée */}
        {filteredAccounts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucune caisse trouvée
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aucune caisse ne correspond à vos critères de recherche.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer une nouvelle caisse
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

