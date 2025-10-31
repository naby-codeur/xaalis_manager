'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  Clock
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Données de démonstration
const projects = [
  {
    id: 1,
    name: 'Projet Santé Communautaire',
    description: 'Amélioration de l\'accès aux soins de santé dans les zones rurales',
    status: 'active',
    budget: 10000000,
    spent: 7500000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    progress: 75,
    team: 8,
    transactions: 45,
    lastActivity: '2024-01-15'
  },
  {
    id: 2,
    name: 'Projet Education',
    description: 'Construction d\'écoles et formation des enseignants',
    status: 'active',
    budget: 15000000,
    spent: 12000000,
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    progress: 80,
    team: 12,
    transactions: 78,
    lastActivity: '2024-01-14'
  },
  {
    id: 3,
    name: 'Projet Eau Potable',
    description: 'Installation de puits et systèmes de filtration d\'eau',
    status: 'completed',
    budget: 8000000,
    spent: 8000000,
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    progress: 100,
    team: 6,
    transactions: 34,
    lastActivity: '2023-12-30'
  },
  {
    id: 4,
    name: 'Projet Agriculture',
    description: 'Formation des agriculteurs et distribution de semences',
    status: 'planned',
    budget: 5000000,
    spent: 0,
    startDate: '2024-03-01',
    endDate: '2024-11-30',
    progress: 0,
    team: 5,
    transactions: 0,
    lastActivity: null
  },
  {
    id: 5,
    name: 'Projet Microfinance',
    description: 'Création de coopératives d\'épargne et de crédit',
    status: 'suspended',
    budget: 12000000,
    spent: 3000000,
    startDate: '2023-03-01',
    endDate: '2024-02-29',
    progress: 25,
    team: 4,
    transactions: 12,
    lastActivity: '2024-01-05'
  }
]

const statusConfig = {
  active: {
    label: 'Actif',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: Play
  },
  completed: {
    label: 'Terminé',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: CheckCircle
  },
  planned: {
    label: 'Planifié',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: Clock
  },
  suspended: {
    label: 'Suspendu',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    icon: Pause
  }
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedProgress, setSelectedProgress] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }


  const getBudgetStatus = (budget: number, spent: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 90) return { status: 'danger', color: 'text-red-600' }
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-600' }
    return { status: 'good', color: 'text-green-600' }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    const matchesProgress = selectedProgress === 'all' || 
                           (selectedProgress === 'low' && project.progress < 30) ||
                           (selectedProgress === 'medium' && project.progress >= 30 && project.progress < 70) ||
                           (selectedProgress === 'high' && project.progress >= 70)
    
    return matchesSearch && matchesStatus && matchesProgress
  })

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0)
  const activeProjects = projects.filter(p => p.status === 'active').length
  const completedProjects = projects.filter(p => p.status === 'completed').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestion des Projets
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Suivez vos projets et leur exécution budgétaire
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Projet
            </Button>
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
                    Budget Total
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalBudget)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Montant Dépensé
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalSpent)}
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
                    Projets Actifs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeProjects}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Projets Terminés
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {completedProjects}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un projet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="completed">Terminé</option>
                  <option value="planned">Planifié</option>
                  <option value="suspended">Suspendu</option>
                </select>
                <select
                  value={selectedProgress}
                  onChange={(e) => setSelectedProgress(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Tous les progrès</option>
                  <option value="low">Faible (&lt;30%)</option>
                  <option value="medium">Moyen (30-70%)</option>
                  <option value="high">Élevé (&gt;70%)</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const statusInfo = statusConfig[project.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo.icon
            const budgetStatus = getBudgetStatus(project.budget, project.spent)
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2">
                            {project.description}
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
                  <CardContent className="space-y-4">
                    {/* Statut et Progrès */}
                    <div className="flex items-center justify-between">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.progress}%
                      </span>
                    </div>

                    {/* Barre de progression */}
                    <div className="space-y-2">
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Budget</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Dépensé</span>
                        <span className={`font-medium ${budgetStatus.color}`}>
                          {formatCurrency(project.spent)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Restant</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(project.budget - project.spent)}
                        </span>
                      </div>
                    </div>

                    {/* Informations du projet */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(project.startDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {project.team} membres
                        </span>
                      </div>
                    </div>

                    {/* Dernière activité */}
                    {project.lastActivity && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Dernière activité: {new Date(project.lastActivity).toLocaleDateString('fr-FR')}
                      </div>
                    )}

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
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aucun projet ne correspond à vos critères de recherche.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer un nouveau projet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

