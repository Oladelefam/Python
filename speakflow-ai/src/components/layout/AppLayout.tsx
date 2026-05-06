import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hop as Home, Mic, ChartBar as BarChart3, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/record', icon: Mic, label: 'Practice' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function AppLayout() {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-bg-secondary/50 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-text-primary">SpeakFlow</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-glow text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
              {profile?.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-text-muted">{profile?.total_sessions || 0} sessions</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-error transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-8 max-w-6xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-border z-50">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-accent'
                    : 'text-text-muted'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
