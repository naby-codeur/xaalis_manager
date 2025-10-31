'use client'

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Language, useTranslations } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language
      return saved && ['fr', 'en', 'ar'].includes(saved) ? saved : 'fr'
    }
    return 'fr'
  })
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setTimeout(() => setMounted(true), 0)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('language', language)
    
    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = language
    
    // Mettre à jour la direction du texte pour l'arabe
    if (language === 'ar') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }, [language, mounted])

  const t = useTranslations(language)

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

