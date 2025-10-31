export type Language = 'fr' | 'en' | 'ar'

export interface Translations {
  [key: string]: string | Translations
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      export: 'Exporter',
      import: 'Importer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      warning: 'Attention',
      info: 'Information',
    },
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      register: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      firstName: 'Prénom',
      lastName: 'Nom',
      forgotPassword: 'Mot de passe oublié ?',
      rememberMe: 'Se souvenir de moi',
    },
    roles: {
      treasurer: 'Trésorier',
      projectManager: 'Responsable Projet',
      auditor: 'Auditeur',
      member: 'Membre',
    },
    navigation: {
      dashboard: 'Tableau de bord',
      transactions: 'Transactions',
      cashAccounts: 'Caisses',
      projects: 'Projets',
      reports: 'Rapports',
      team: 'Équipe',
      settings: 'Paramètres',
      profile: 'Profil',
    },
    dashboard: {
      title: 'Tableau de bord',
      totalBalance: 'Solde total',
      monthlyExpenses: 'Dépenses mensuelles',
      monthlyIncome: 'Revenus mensuels',
      recentTransactions: 'Transactions récentes',
      budgetStatus: 'État du budget',
    },
    transactions: {
      title: 'Transactions',
      addTransaction: 'Ajouter une transaction',
      amount: 'Montant',
      description: 'Description',
      category: 'Catégorie',
      date: 'Date',
      type: 'Type',
      expense: 'Dépense',
      income: 'Revenu',
      reference: 'Référence',
      attachments: 'Pièces jointes',
    },
    cashAccounts: {
      title: 'Caisses',
      addAccount: 'Ajouter une caisse',
      name: 'Nom',
      balance: 'Solde',
      currency: 'Devise',
      description: 'Description',
    },
    projects: {
      title: 'Projets',
      addProject: 'Ajouter un projet',
      name: 'Nom',
      description: 'Description',
      status: 'Statut',
      budget: 'Budget',
      startDate: 'Date de début',
      endDate: 'Date de fin',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
    },
    roles: {
      treasurer: 'Treasurer',
      projectManager: 'Project Manager',
      auditor: 'Auditor',
      member: 'Member',
    },
    navigation: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      cashAccounts: 'Cash Accounts',
      projects: 'Projects',
      reports: 'Reports',
      team: 'Team',
      settings: 'Settings',
      profile: 'Profile',
    },
    dashboard: {
      title: 'Dashboard',
      totalBalance: 'Total Balance',
      monthlyExpenses: 'Monthly Expenses',
      monthlyIncome: 'Monthly Income',
      recentTransactions: 'Recent Transactions',
      budgetStatus: 'Budget Status',
    },
    transactions: {
      title: 'Transactions',
      addTransaction: 'Add Transaction',
      amount: 'Amount',
      description: 'Description',
      category: 'Category',
      date: 'Date',
      type: 'Type',
      expense: 'Expense',
      income: 'Income',
      reference: 'Reference',
      attachments: 'Attachments',
    },
    cashAccounts: {
      title: 'Cash Accounts',
      addAccount: 'Add Account',
      name: 'Name',
      balance: 'Balance',
      currency: 'Currency',
      description: 'Description',
    },
    projects: {
      title: 'Projects',
      addProject: 'Add Project',
      name: 'Name',
      description: 'Description',
      status: 'Status',
      budget: 'Budget',
      startDate: 'Start Date',
      endDate: 'End Date',
    },
  },
  ar: {
    common: {
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث',
      filter: 'تصفية',
      export: 'تصدير',
      import: 'استيراد',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      warning: 'تحذير',
      info: 'معلومات',
    },
    auth: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
    },
    roles: {
      treasurer: 'أمين الصندوق',
      projectManager: 'مدير المشروع',
      auditor: 'مراجع',
      member: 'عضو',
    },
    navigation: {
      dashboard: 'لوحة التحكم',
      transactions: 'المعاملات',
      cashAccounts: 'الحسابات النقدية',
      projects: 'المشاريع',
      reports: 'التقارير',
      team: 'الفريق',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
    },
    dashboard: {
      title: 'لوحة التحكم',
      totalBalance: 'الرصيد الإجمالي',
      monthlyExpenses: 'المصروفات الشهرية',
      monthlyIncome: 'الإيرادات الشهرية',
      recentTransactions: 'المعاملات الأخيرة',
      budgetStatus: 'حالة الميزانية',
    },
    transactions: {
      title: 'المعاملات',
      addTransaction: 'إضافة معاملة',
      amount: 'المبلغ',
      description: 'الوصف',
      category: 'الفئة',
      date: 'التاريخ',
      type: 'النوع',
      expense: 'مصروف',
      income: 'دخل',
      reference: 'المرجع',
      attachments: 'المرفقات',
    },
    cashAccounts: {
      title: 'الحسابات النقدية',
      addAccount: 'إضافة حساب',
      name: 'الاسم',
      balance: 'الرصيد',
      currency: 'العملة',
      description: 'الوصف',
    },
    projects: {
      title: 'المشاريع',
      addProject: 'إضافة مشروع',
      name: 'الاسم',
      description: 'الوصف',
      status: 'الحالة',
      budget: 'الميزانية',
      startDate: 'تاريخ البداية',
      endDate: 'تاريخ النهاية',
    },
  },
}

export function useTranslations(language: Language) {
  return (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}

export function getLanguageFromLocale(locale: string): Language {
  switch (locale) {
    case 'fr':
      return 'fr'
    case 'en':
      return 'en'
    case 'ar':
      return 'ar'
    default:
      return 'fr'
  }
}


