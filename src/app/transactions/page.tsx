'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  CreditCard,
  FileText,
  AlertTriangle
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Données de démonstration
const transactions = [
  {
    id: 1,
    description: 'Achat équipement informatique',
    amount: 250000,
    type: 'expense',
    category: 'Équipement',
    date: '2024-01-15',
    status: 'completed',
    reference: 'TXN-001',
    cashAccount: 'Caisse Principale',
    project: 'Projet Santé',
    attachments: 2
  },
  {
    id: 2,
    description: 'Subvention UNICEF',
    amount: 5000000,
    type: 'income',
    category: 'Subvention',
    date: '2024-01-14',
    status: 'completed',
    reference: 'TXN-002',
    cashAccount: 'Caisse Principale',
    project: 'Projet Santé',
    attachments: 1
  },
  {
    id: 3,
    description: 'Frais de transport équipe',
    amount: 75000,
    type: 'expense',
    category: 'Transport',
    date: '2024-01-13',
    status: 'pending',
    reference: 'TXN-003',
    cashAccount: 'Caisse Transport',
    project: 'Projet Education',
    attachments: 0
  },
  {
    id: 4,
    description: 'Paiement salaires',
    amount: 1200000,
    type: 'expense',
    category: 'Salaires',
    date: '2024-01-12',
    status: 'completed',
    reference: 'TXN-004',
    cashAccount: 'Caisse Principale',
    project: 'Projet Santé',
    attachments: 1
  },
  {
    id: 5,
    description: 'Don privé',
    amount: 500000,
    type: 'income',
    category: 'Don',
    date: '2024-01-11',
    status: 'completed',
    reference: 'TXN-005',
    cashAccount: 'Caisse Principale',
    project: null,
    attachments: 0
  },
  {
    id: 6,
    description: 'Achat médicaments',
    amount: 180000,
    type: 'expense',
    category: 'Équipement',
    date: '2024-01-10',
    status: 'failed',
    reference: 'TXN-006',
    cashAccount: 'Caisse Principale',
    project: 'Projet Santé',
    attachments: 0
  }
]

const categories = [
  { name: 'Transport', type: 'expense', color: 'bg-blue-100 text-blue-800' },
  { name: 'Salaires', type: 'expense', color: 'bg-green-100 text-green-800' },
  { name: 'Équipement', type: 'expense', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Communication', type: 'expense', color: 'bg-purple-100 text-purple-800' },
  { name: 'Subvention', type: 'income', color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Don', type: 'income', color: 'bg-pink-100 text-pink-800' },
  { name: 'Cotisation', type: 'income', color: 'bg-indigo-100 text-indigo-800' }
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTab, setSelectedTab] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé'
      case 'pending':
        return 'En attente'
      case 'failed':
        return 'Échec'
      default:
        return 'Inconnu'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'income' ? TrendingUp : TrendingDown
  }

  const getTypeColor = (type: string) => {
    return type === 'income' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400'
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || transaction.type === selectedType
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'income' && transaction.type === 'income') ||
                      (selectedTab === 'expense' && transaction.type === 'expense')
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory && matchesTab
  })

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingTransactions = transactions.filter(t => t.status === 'pending').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transactions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos dépenses et revenus
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Revenus Totaux
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(totalIncome)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Dépenses Totales
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(totalExpenses)}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Solde Net
                  </p>
                  <p className={`text-2xl font-bold ${
                    totalIncome - totalExpenses >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(totalIncome - totalExpenses)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    En Attente
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {pendingTransactions}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="income">Revenus</TabsTrigger>
            <TabsTrigger value="expense">Dépenses</TabsTrigger>
            <TabsTrigger value="pending">En Attente</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher une transaction..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les types</option>
                  <option value="income">Revenus</option>
                  <option value="expense">Dépenses</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="completed">Terminé</option>
                  <option value="pending">En attente</option>
                  <option value="failed">Échec</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
            <CardDescription>
              Liste de toutes vos transactions financières
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction, index) => {
                const TypeIcon = getTypeIcon(transaction.type)
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : 'bg-red-100 dark:bg-red-900'
                      }`}>
                        <TypeIcon className={`w-5 h-5 ${
                          transaction.type === 'income' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {transaction.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.reference}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.category}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.cashAccount}
                          </p>
                          {transaction.project && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {transaction.project}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {transaction.attachments > 0 && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FileText className="w-4 h-4 mr-1" />
                          {transaction.attachments}
                        </div>
                      )}
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusLabel(transaction.status)}
                      </Badge>
                      <p className={`font-semibold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
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
                  </motion.div>
                )
              })}
            </div>

            {/* Message si aucune transaction trouvée */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Aucune transaction trouvée
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Aucune transaction ne correspond à vos critères de recherche.
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une nouvelle transaction
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

