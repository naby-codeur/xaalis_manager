'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

// Données de démonstration pour l'équipe
const teamMembers = [
  {
    id: 1,
    firstName: 'Aminata',
    lastName: 'Diallo',
    email: 'aminata.diallo@xaliss.com',
    role: 'Treasurer',
    status: 'active',
    phone: '+221 77 123 45 67',
    location: 'Dakar, Sénégal',
    joinDate: '2023-01-15',
    avatar: null,
    permissions: ['read', 'write', 'approve'],
    lastActive: '2024-01-15 14:30'
  },
  {
    id: 2,
    firstName: 'Jean-Pierre',
    lastName: 'Martin',
    email: 'jean.martin@xaliss.com',
    role: 'Project Manager',
    status: 'active',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    joinDate: '2023-03-20',
    avatar: null,
    permissions: ['read', 'write'],
    lastActive: '2024-01-15 12:15'
  },
  {
    id: 3,
    firstName: 'Fatima',
    lastName: 'Al-Zahra',
    email: 'fatima.alzahra@xaliss.com',
    role: 'Auditor',
    status: 'active',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Maroc',
    joinDate: '2023-06-10',
    avatar: null,
    permissions: ['read'],
    lastActive: '2024-01-14 16:45'
  },
  {
    id: 4,
    firstName: 'Mohamed',
    lastName: 'Traoré',
    email: 'mohamed.traore@xaliss.com',
    role: 'Member',
    status: 'inactive',
    phone: '+223 70 98 76 54',
    location: 'Bamako, Mali',
    joinDate: '2023-09-05',
    avatar: null,
    permissions: ['read'],
    lastActive: '2024-01-10 09:20'
  }
]

const roles = [
  { value: 'treasurer', label: 'Trésorier', color: 'bg-green-100 text-green-800' },
  { value: 'projectManager', label: 'Responsable Projet', color: 'bg-blue-100 text-blue-800' },
  { value: 'auditor', label: 'Auditeur', color: 'bg-purple-100 text-purple-800' },
  { value: 'member', label: 'Membre', color: 'bg-gray-100 text-gray-800' }
]

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [invitedByUserId, setInvitedByUserId] = useState<string | null>(null)
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const [inviteError, setInviteError] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrganizationId(sessionStorage.getItem('organizationId'))
      setInvitedByUserId(sessionStorage.getItem('userId'))
    }
  }, [])

  const onInvite = async () => {
    setInviteError(null)
    setInviteLink(null)
    if (!organizationId || !invitedByUserId) {
      setInviteError("Contexte manquant: organizationId ou userId")
      return
    }
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole.toUpperCase(),
          organizationId,
          invitedByUserId,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Erreur')
      setInviteLink(data.link)
      setIsAddDialogOpen(false)
      setInviteEmail('')
      setInviteRole('member')
    } catch (e: any) {
      setInviteError(e.message)
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role.toLowerCase()) || roles[3]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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
      case 'pending':
        return 'En attente'
      default:
        return 'Inconnu'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-effect border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('navigation.team')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez les membres de votre équipe et leurs permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un membre
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau membre</DialogTitle>
                    <DialogDescription>
                      Invitez un nouveau membre à rejoindre votre équipe.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" placeholder="Jean" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Dupont" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="jean.dupont@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="role">Rôle</Label>
                      <Select value={inviteRole} onValueChange={setInviteRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={onInvite} disabled={!inviteEmail || !inviteRole || !organizationId || !invitedByUserId}>Inviter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filtres et recherche */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un membre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback invitation */}
        {inviteError && (
          <div className="mb-4 text-red-600 text-sm">{inviteError}</div>
        )}
        {inviteLink && (
          <div className="mb-4 text-green-700 text-sm">Lien d'invitation créé: {inviteLink}</div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl shadow-lg">
                  <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total membres
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teamMembers.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Actifs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Inactifs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teamMembers.filter(m => m.status === 'inactive').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Administrateurs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teamMembers.filter(m => m.role === 'Treasurer').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des membres */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Membres de l&apos;équipe</CardTitle>
            <CardDescription>
              {filteredMembers.length} membre(s) trouvé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member, index) => {
                const roleInfo = getRoleInfo(member.role)
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-md hover-lift bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          {member.firstName[0]}{member.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {member.firstName} {member.lastName}
                          </h3>
                          <Badge className={roleInfo.color}>
                            {roleInfo.label}
                          </Badge>
                          <Badge className={getStatusColor(member.status)}>
                            {getStatusLabel(member.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {member.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {member.location}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Rejoint le {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div>
                            Dernière activité: {member.lastActive}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
