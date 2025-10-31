import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript (tables minimales utilisées ici)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: 'ADMIN' | 'TREASURER' | 'PROJECT_MANAGER' | 'AUDITOR' | 'MEMBER'
          avatar?: string
          is_active: boolean
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          role?: 'ADMIN' | 'TREASURER' | 'PROJECT_MANAGER' | 'AUDITOR' | 'MEMBER'
          avatar?: string
          is_active?: boolean
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      organizations: {
        Row: {
          id: string
          name: string
          description?: string
          logo?: string
          website?: string
          address?: string
          phone?: string
          email?: string
          currency: string
          timezone: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['organizations']['Row']> & { name: string }
        Update: Partial<Database['public']['Tables']['organizations']['Row']>
      }
      invitations: {
        Row: {
          id: string
          email: string
          role: 'ADMIN' | 'TREASURER' | 'PROJECT_MANAGER' | 'AUDITOR' | 'MEMBER'
          organization_id: string
          token: string
          expires_at: string
          accepted_at: string | null
          invited_by_user_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['invitations']['Row']>
        Update: Partial<Database['public']['Tables']['invitations']['Row']>
      }
    }
  }
}


