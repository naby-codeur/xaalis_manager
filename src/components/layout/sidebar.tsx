'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BarChart3,
  CreditCard,
  FileText,
  Settings,
  Users,
  Wallet,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  Plus,
  Search,
  Filter
} from 'lucide-react'

interface SidebarProps {
  user?: {
    firstName: string
    lastName: string
    role: string
    avatar?: string
  }
  notifications?: number
}

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home, current: true },
  { name: 'Transactions', href: '/transactions', icon: CreditCard, current: false },
  { name: 'Caisses', href: '/cash-accounts', icon: Wallet, current: false },
  { name: 'Projets', href: '/projects', icon: FileText, current: false },
  { name: 'Rapports', href: '/reports', icon: BarChart3, current: false },
  { name: 'Équipe', href: '/team', icon: Users, current: false },
  { name: 'Paramètres', href: '/settings', icon: Settings, current: false },
]

const quickActions = [
  { name: 'Nouvelle transaction', href: '/transactions/new', icon: Plus },
  { name: 'Nouveau projet', href: '/projects/new', icon: FileText },
  { name: 'Nouvelle caisse', href: '/cash-accounts/new', icon: Wallet },
]

export function Sidebar({ user, notifications = 0 }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'TREASURER':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'PROJECT_MANAGER':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'AUDITOR':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'MEMBER':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'TREASURER':
        return 'Trésorier'
      case 'PROJECT_MANAGER':
        return 'Responsable Projet'
      case 'AUDITOR':
        return 'Auditeur'
      case 'MEMBER':
        return 'Membre'
      default:
        return 'Membre'
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/80 backdrop-blur-md"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0 lg:static lg:inset-0",
          "transform transition-transform duration-300 ease-in-out lg:transition-none"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XM</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Xaliss Manager</span>
          </div>

          {/* User Profile */}
          {user && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <Badge className={cn("text-xs", getRoleColor(user.role))}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                {notifications > 0 && (
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-red-500 text-white">
                      {notifications}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions rapides
              </p>
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <action.icon className="w-4 h-4 mr-3" />
                  {action.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Déconnexion
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

