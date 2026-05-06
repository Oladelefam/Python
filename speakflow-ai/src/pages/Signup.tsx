import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await signUp(email, password, name)
      navigate('/onboarding')
    } catch {
      setError('Could not create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>
      <motion.div className="w-full max-w-md relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center"><Mic className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold text-text-primary">SpeakFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary">Start your journey to confident speaking</p>
        </div>
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-primary/50 border border-border rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="Your name" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-primary/50 border border-border rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-primary/50 border border-border rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="6+ characters" required />
              </div>
            </div>
            {error && <div className="bg-error-glow border border-error/20 rounded-xl px-4 py-3 text-sm text-error">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>
          <p className="text-xs text-text-muted text-center mt-4">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">Already have an account? <Link to="/login" className="text-accent hover:text-accent-light font-medium">Sign in</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
