'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Données de démonstration
const monthlyData = [
  { month: 'Jan', income: 45000, expenses: 32000, balance: 13000 },
  { month: 'Fév', income: 52000, expenses: 38000, balance: 14000 },
  { month: 'Mar', income: 48000, expenses: 35000, balance: 13000 },
  { month: 'Avr', income: 61000, expenses: 42000, balance: 19000 },
  { month: 'Mai', income: 55000, expenses: 40000, balance: 15000 },
  { month: 'Jun', income: 67000, expenses: 45000, balance: 22000 },
]

const categoryData = [
  { name: 'Transport', value: 25, amount: 12000, color: '#3b82f6' },
  { name: 'Salaires', value: 35, amount: 16800, color: '#10b981' },
  { name: 'Équipement', value: 20, amount: 9600, color: '#f59e0b' },
  { name: 'Communication', value: 10, amount: 4800, color: '#ef4444' },
  { name: 'Autres', value: 10, amount: 4800, color: '#8b5cf6' },
]

const recentTransactions = [
  {
    id: 1,
    description: 'Achat équipement informatique',
    amount: 250000,
    type: 'expense',
    category: 'Équipement',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    description: 'Subvention UNICEF',
    amount: 5000000,
    type: 'income',
    category: 'Subvention',
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: 3,
    description: 'Frais de transport équipe',
    amount: 75000,
    type: 'expense',
    category: 'Transport',
    date: '2024-01-13',
    status: 'pending'
  },
  {
    id: 4,
    description: 'Paiement salaires',
    amount: 1200000,
    type: 'expense',
    category: 'Salaires',
    date: '2024-01-12',
    status: 'completed'
  },
]

const kpis = [
  {
    title: 'Solde Total',
    value: '2,450,000 FCFA',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900'
  },
  {
    title: 'Dépenses du Mois',
    value: '1,850,000 FCFA',
    change: '-5.2%',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900'
  },
  {
    title: 'Revenus du Mois',
    value: '2,200,000 FCFA',
    change: '+8.7%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900'
  },
  {
    title: 'Taux d\'Exécution',
    value: '84.2%',
    change: '+2.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900'
  }
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simuler un chargement
    setTimeout(() => setIsLoading(false), 1000)
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tableau de bord
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Vue d&apos;ensemble de vos finances
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {kpi.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {kpi.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {kpi.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                      <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Évolution des finances */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Finances</CardTitle>
              <CardDescription>
                Revenus, dépenses et solde sur 6 mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="line" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="line">Ligne</TabsTrigger>
                  <TabsTrigger value="area">Zone</TabsTrigger>
                </TabsList>
                <TabsContent value="line" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Revenus"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Dépenses"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Solde"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="area" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Revenus"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stackId="2"
                        stroke="#ef4444" 
                        fill="#ef4444"
                        fillOpacity={0.6}
                        name="Dépenses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Répartition des dépenses */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Dépenses</CardTitle>
              <CardDescription>
                Par catégorie ce mois-ci
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [
                      formatCurrency(props.payload.amount),
                      name
                    ]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions récentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transactions Récentes</CardTitle>
                <CardDescription>
                  Dernières activités financières
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusLabel(transaction.status)}
                    </Badge>
                    <p className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
          
      </div>
    </div>
  )
}

