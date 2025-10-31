'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  CreditCard, 
  Wallet, 
  FolderOpen, 
  BarChart3, 
  Users,
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Coins
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

const navigation = [
  {
    name: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: 'transactions',
    href: '/transactions',
    icon: CreditCard,
    current: false,
  },
  {
    name: 'cashAccounts',
    href: '/cash-accounts',
    icon: Wallet,
    current: false,
  },
  {
    name: 'projects',
    href: '/projects',
    icon: FolderOpen,
    current: false,
  },
  {
    name: 'reports',
    href: '/reports',
    icon: BarChart3,
    current: false,
  },
  {
    name: 'resources',
    href: '/resources',
    icon: Coins,
    current: false,
  },
  {
    name: 'team',
    href: '/team',
    icon: Users,
    current: false,
  },
]

const userNavigation = [
  {
    name: 'profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'settings',
    href: '/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobile}
          className="bg-white dark:bg-gray-800"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        collapsed && "lg:w-16",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/images/logo_xm.png"
                    alt="Xaliss Manager Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Xaliss Manager
                </span>
              </div>
            )}
            {collapsed && (
              <div className="w-8 h-8 relative mx-auto">
                <Image
                  src="/images/logo_xm.png"
                  alt="Xaliss Manager Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="hidden lg:flex"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
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
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && (
                    <span>{item.name === 'resources' ? 'Ressources' : t(`navigation.${item.name}`)}</span>
                  )}
                  {isActive && !collapsed && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Active
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            {/* User info */}
            <div className={cn("flex items-center space-x-3 mb-4", collapsed && "justify-center")}>
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@xaliss.com
                  </p>
                </div>
              )}
            </div>

            {/* User navigation */}
            <div className="space-y-1">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span>{t(`navigation.${item.name}`)}</span>}
                </Link>
              ))}
              
              <button
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
                  collapsed && "justify-center"
                )}
              >
                <LogOut className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{t('auth.logout')}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
