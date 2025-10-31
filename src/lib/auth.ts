import { supabase } from './supabase'
export type UserRole = 'ADMIN' | 'TREASURER' | 'PROJECT_MANAGER' | 'AUDITOR' | 'MEMBER'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  isActive: boolean
  organizationId: string
  createdAt: string
  updatedAt: string
}

export interface AuthError {
  message: string
  status?: number
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: { message: error.message, status: 400 } }
    }

    if (!data.user) {
      return { user: null, error: { message: 'Aucun utilisateur trouvé', status: 404 } }
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError || !userData) {
      return { user: null, error: { message: 'Erreur lors de la récupération des données utilisateur', status: 500 } }
    }

    return { user: userData as User, error: null }
  } catch { /* empty */
    return { user: null, error: { message: 'Erreur de connexion', status: 500 } }
  }
}

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  organizationId: string,
  role: UserRole = 'MEMBER'
): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { user: null, error: { message: error.message, status: 400 } }
    }

    if (!data.user) {
      return { user: null, error: { message: 'Erreur lors de la création du compte', status: 500 } }
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
        organization_id: organizationId,
      })
      .select()
      .single()

    if (userError) {
      return { user: null, error: { message: 'Erreur lors de la création du profil utilisateur', status: 500 } }
    }

    return { user: userData as User, error: null }
  } catch { /* empty */
    return { user: null, error: { message: 'Erreur d\'inscription', status: 500 } }
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: { message: error.message, status: 400 } }
    }

    return { error: null }
  } catch { /* empty */
    return { error: { message: 'Erreur de déconnexion', status: 500 } }
  }
}

export async function getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return { user: null, error: { message: 'Utilisateur non authentifié', status: 401 } }
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()

    if (userError || !userData) {
      return { user: null, error: { message: 'Erreur lors de la récupération des données utilisateur', status: 500 } }
    }

    return { user: userData as User, error: null }
  } catch { /* empty */
    return { user: null, error: { message: 'Erreur de récupération utilisateur', status: 500 } }
  }
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    ADMIN: 4,
    MEMBER: 0,
    AUDITOR: 1,
    PROJECT_MANAGER: 2,
    TREASURER: 3,
  }
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function canAccess(user: User, resource: string, action: string): boolean {
  switch (user.role) {
    case 'ADMIN':
      return true
    case 'TREASURER':
      return true
    case 'PROJECT_MANAGER':
      return ['transactions', 'projects', 'reports'].includes(resource)
    case 'AUDITOR':
      return ['transactions', 'reports', 'audit'].includes(resource) && action === 'read'
    case 'MEMBER':
      return ['transactions'].includes(resource) && action === 'read'
    default:
      return false
  }
}


