'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Download, 
  Filter, 
  FileText,
  BarChart3,
  Eye,
  Share2,
  Mail,
  Printer
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Données de démonstration pour les rapports
const monthlyData = [
  { month: 'Jan', income: 45000, expenses: 32000, balance: 13000 },
  { month: 'Fév', income: 52000, expenses: 38000, balance: 14000 },
  { month: 'Mar', income: 48000, expenses: 35000, balance: 13000 },
  { month: 'Avr', income: 61000, expenses: 42000, balance: 19000 },
  { month: 'Mai', income: 55000, expenses: 40000, balance: 15000 },
  { month: 'Jun', income: 67000, expenses: 45000, balance: 22000 },
]

const projectData = [
  { name: 'Projet Santé', budget: 10000000, spent: 7500000, remaining: 2500000, progress: 75 },
  { name: 'Projet Education', budget: 15000000, spent: 12000000, remaining: 3000000, progress: 80 },
  { name: 'Projet Eau', budget: 8000000, spent: 8000000, remaining: 0, progress: 100 },
  { name: 'Projet Agriculture', budget: 5000000, spent: 1500000, remaining: 3500000, progress: 30 },
]

const categoryData = [
  { name: 'Transport', amount: 1200000, percentage: 25, color: '#3b82f6' },
  { name: 'Salaires', amount: 1680000, percentage: 35, color: '#10b981' },
  { name: 'Équipement', amount: 960000, percentage: 20, color: '#f59e0b' },
  { name: 'Communication', amount: 480000, percentage: 10, color: '#ef4444' },
  { name: 'Autres', amount: 480000, percentage: 10, color: '#8b5cf6' },
]

const reportTemplates = [
  {
    id: 1,
    name: 'Rapport Financier Mensuel',
    description: 'Vue d\'ensemble des finances du mois',
    type: 'monthly',
    lastGenerated: '2024-01-15',
    format: 'PDF'
  },
  {
    id: 2,
    name: 'Rapport de Projet',
    description: 'Suivi détaillé d\'un projet spécifique',
    type: 'project',
    lastGenerated: '2024-01-14',
    format: 'Excel'
  },
  {
    id: 3,
    name: 'Rapport pour Bailleur',
    description: 'Rapport officiel pour les bailleurs de fonds',
    type: 'donor',
    lastGenerated: '2024-01-10',
    format: 'PDF'
  },
  {
    id: 4,
    name: 'Rapport d\'Audit',
    description: 'Rapport complet pour audit externe',
    type: 'audit',
    lastGenerated: '2024-01-05',
    format: 'PDF'
  }
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m')
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedFormat, setSelectedFormat] = useState('pdf')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleGenerateReport = (templateId: number) => {
    // Simulation de génération de rapport
    console.log(`Génération du rapport ${templateId}...`)
  }

  const handleExportData = (format: string) => {
    // Simulation d'export de données
    console.log(`Export en format ${format}...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Rapports & Exports
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Générez et exportez vos rapports financiers
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Envoyer par email
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exporter tout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filtres et Options */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Période
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="1m">1 mois</option>
                  <option value="3m">3 mois</option>
                  <option value="6m">6 mois</option>
                  <option value="1y">1 an</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Projet
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les projets</option>
                  <option value="sante">Projet Santé</option>
                  <option value="education">Projet Education</option>
                  <option value="eau">Projet Eau</option>
                  <option value="agriculture">Projet Agriculture</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format d&apos;export
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button>
                  <Filter className="w-4 h-4 mr-2" />
                  Appliquer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates de Rapports */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Modèles de Rapports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      <Badge variant="outline">{template.format}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Dernière génération: {new Date(template.lastGenerated).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleGenerateReport(template.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Générer
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Graphiques et Analyses */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Finances</CardTitle>
                  <CardDescription>Revenus et dépenses sur 6 mois</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Dépenses</CardTitle>
                  <CardDescription>Par catégorie ce mois-ci</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance des Projets</CardTitle>
                <CardDescription>Budget vs dépenses par projet</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                    <Bar dataKey="spent" fill="#ef4444" name="Dépensé" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse par Catégorie</CardTitle>
                <CardDescription>Détail des dépenses par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(category.amount)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {category.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendances Financières</CardTitle>
                <CardDescription>Évolution des indicateurs clés</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Solde"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions d'Export */}
        <Card>
          <CardHeader>
            <CardTitle>Export de Données</CardTitle>
            <CardDescription>
              Exportez vos données dans différents formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleExportData('pdf')}
              >
                <FileText className="w-6 h-6" />
                <span>Export PDF</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleExportData('excel')}
              >
                <BarChart3 className="w-6 h-6" />
                <span>Export Excel</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleExportData('csv')}
              >
                <Download className="w-6 h-6" />
                <span>Export CSV</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => handleExportData('print')}
              >
                <Printer className="w-6 h-6" />
                <span>Imprimer</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

