import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile, Session } from '../lib/types'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  sessions: Session[]
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  refreshSessions: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    if (data) setProfile(data as Profile)
  }

  async function fetchSessions(userId: string) {
    const { data } = await supabase.from('sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) setSessions(data as Session[])
  }

  async function refreshProfile() {
    if (user) await fetchProfile(user.id)
  }

  async function refreshSessions() {
    if (user) await fetchSessions(user.id)
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
          await fetchSessions(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
          setSessions([])
        }
        setLoading(false)
      })()
    })
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signUp(email: string, password: string, name: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
    setSessions([])
  }

  return (
    <AuthContext.Provider value={{ user, profile, sessions, loading, signIn, signUp, signOut, refreshProfile, refreshSessions }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
