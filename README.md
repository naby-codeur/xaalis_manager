# 🏦 Xaliss Manager

**Application Web Progressive (PWA) de Gestion des Dépenses et des Ressources**

Une solution complète et moderne pour la gestion financière des ONG, associations, coopératives, PME et projets communautaires.

## ✨ Fonctionnalités Principales

### 🎯 Gestion Financière Complète
- **Tableau de bord interactif** avec graphiques en temps réel
- **Gestion des caisses** par projet et activité
- **Suivi des transactions** (dépenses et revenus)
- **Gestion des projets** avec suivi budgétaire
- **Rapports détaillés** et exports PDF/Excel

### 🔐 Sécurité et Rôles
- **Authentification sécurisée** avec Supabase
- **Système de rôles** (Administrateur, Trésorier, Responsable projet, Auditeur, Membre)
- **Inscription par invitation uniquement** (créée par un Administrateur depuis l'onglet Équipe)
- **Contrôle d'accès** basé sur les permissions
- **Audit trail** complet des actions

### 🌍 Multilingue et PWA
- **Support multilingue** (Français, Anglais, Arabe)
- **Application Progressive** installable sur mobile et desktop
- **Mode hors-ligne** avec synchronisation
- **Notifications push** en temps réel

### 🤖 Intelligence Artificielle
- **Analyse prédictive** des dépenses
- **Détection d'anomalies** automatique
- **Recommandations** d'optimisation budgétaire
- **Assistant IA** intégré

## 🚀 Technologies Utilisées

### Frontend
- **Next.js 15** avec App Router et Server Actions
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **shadcn/ui** pour les composants UI
- **Recharts** pour les graphiques

### Backend
- **Supabase** (PostgreSQL, Auth, Storage, Realtime)
- **Prisma** comme ORM
- **Next.js API Routes** pour les endpoints

### PWA & Offline
- **next-pwa** pour les fonctionnalités PWA
- **IndexedDB** pour le stockage hors-ligne
- **Service Workers** pour la mise en cache

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/xaliss-manager.git
cd xaliss-manager
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp env.example .env.local
```

Éditez le fichier `.env.local` avec vos configurations :
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/xaliss_manager"
DIRECT_URL="postgresql://username:password@localhost:5432/xaliss_manager"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push
```

### 5. Démarrer l'application
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── dashboard/         # Tableau de bord
│   ├── transactions/      # Gestion des transactions
│   ├── cash-accounts/     # Gestion des caisses
│   ├── projects/          # Gestion des projets
│   └── reports/           # Rapports
├── components/            # Composants React
│   ├── ui/               # Composants UI (shadcn/ui)
│   ├── layout/           # Composants de layout
│   └── providers/        # Context providers
├── lib/                  # Utilitaires et configurations
│   ├── auth.ts          # Authentification
│   ├── supabase.ts      # Configuration Supabase
│   ├── i18n.ts          # Internationalisation
│   └── theme.ts         # Gestion des thèmes
└── prisma/              # Schéma de base de données
    └── schema.prisma
```

## 🎨 Design System

### Palette de Couleurs
- **Trésorerie** : Bleu foncé (#1e40af)
- **Ressources** : Vert (#059669)
- **Alertes** : Orange (#d97706)
- **Fond neutre** : Gris clair (#f9fafb)
- **Mode sombre** : Support complet

### Composants UI
- Design moderne et responsive
- Animations fluides avec Framer Motion
- Accessibilité optimisée
- Thème clair/sombre

## 📱 Fonctionnalités PWA

- **Installation** sur mobile et desktop
- **Mode hors-ligne** avec synchronisation
- **Notifications push** pour les alertes
- **Raccourcis** pour les actions rapides
- **Icônes adaptatives** pour tous les appareils

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint

# Base de données
npx prisma studio        # Interface graphique
npx prisma db push       # Appliquer les changements
npx prisma generate      # Générer le client
```

## 🌐 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres plateformes
- **Netlify** : Support complet
- **Railway** : Pour le backend
- **Supabase** : Base de données et auth

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : support@xaliss-manager.com
- **Documentation** : [docs.xaliss-manager.com](https://docs.xaliss-manager.com)
- **Issues** : [GitHub Issues](https://github.com/votre-username/xaliss-manager/issues)

## 🎯 Roadmap

### Version 2.0 (Q2 2024)
- [ ] Module de rapports avancés
- [ ] Intégration IA complète
- [ ] API publique
- [ ] Mobile app native

### Version 2.1 (Q3 2024)
- [ ] Intégration paiements (Stripe, CinetPay)
- [ ] Module de formation
- [ ] Analytics avancés
- [ ] Export vers comptabilité

---

**Développé avec ❤️ pour les organisations qui font la différence**