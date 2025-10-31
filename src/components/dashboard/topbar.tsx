'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface TopbarProps {
  placeholder?: string
}

export function Topbar({ placeholder = 'Rechercher...' }: TopbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 lg:ml-64">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={placeholder}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


