import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Target, Zap, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

const goals = [
  'Improve public speaking confidence',
  'Prepare for a presentation',
  'Ace job interviews',
  'Reduce filler words',
  'Better vocal delivery',
  'Improve body language',
]

const levels = [
  { id: 'beginner', label: 'Beginner', desc: 'New to public speaking' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some experience, want to improve' },
  { id: 'advanced', label: 'Advanced', desc: 'Experienced, want to master it' },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [level, setLevel] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleComplete() {
    if (user) {
      await supabase.from('profiles').upsert({ id: user.id, onboarding_completed: true })
    }
    navigate('/dashboard')
  }

  function toggleGoal(goal: string) {
    setSelectedGoals((prev) => prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal])
  }

  const steps = [
    <motion.div key="welcome" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
      <div className="w-20 h-20 rounded-2xl bg-accent-glow border border-accent/20 flex items-center justify-center mx-auto mb-6">
        <Mic className="w-10 h-10 text-accent" />
      </div>
      <h2 className="text-3xl font-bold text-text-primary mb-3">Welcome to SpeakFlow</h2>
      <p className="text-text-secondary max-w-md mx-auto mb-8">Your AI-powered speaking coach. Let's set up your experience in under a minute.</p>
      <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300">
        Let's Go <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>,

    <motion.div key="goals" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="text-center mb-8">
        <Target className="w-10 h-10 text-teal mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">What do you want to improve?</h2>
        <p className="text-text-secondary">Select all that apply</p>
      </div>
      <div className="grid gap-3 max-w-md mx-auto">
        {goals.map((goal) => (
          <button key={goal} onClick={() => toggleGoal(goal)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
              selectedGoals.includes(goal) ? 'border-accent/50 bg-accent-glow text-text-primary' : 'border-border bg-bg-card hover:border-border-light text-text-secondary'
            }`}>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${selectedGoals.includes(goal) ? 'border-accent bg-accent' : 'border-border'}`}>
              {selectedGoals.includes(goal) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm font-medium">{goal}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={() => setStep(2)} disabled={selectedGoals.length === 0}
          className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-40">
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>,

    <motion.div key="level" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="text-center mb-8">
        <Zap className="w-10 h-10 text-warning mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">What's your experience level?</h2>
        <p className="text-text-secondary">This helps us personalize your coaching</p>
      </div>
      <div className="grid gap-4 max-w-md mx-auto">
        {levels.map((l) => (
          <button key={l.id} onClick={() => setLevel(l.id)}
            className={`p-5 rounded-xl border transition-all duration-200 text-left ${level === l.id ? 'border-accent/50 bg-accent-glow' : 'border-border bg-bg-card hover:border-border-light'}`}>
            <div className="text-base font-semibold text-text-primary mb-1">{l.label}</div>
            <div className="text-sm text-text-secondary">{l.desc}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={() => setStep(3)} disabled={!level}
          className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-40">
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>,

    <motion.div key="ready" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
      <div className="w-20 h-20 rounded-2xl bg-success-glow border border-success/20 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-success" />
      </div>
      <h2 className="text-3xl font-bold text-text-primary mb-3">You're all set!</h2>
      <p className="text-text-secondary max-w-md mx-auto mb-8">Your personalized coaching experience is ready. Let's start your first practice session.</p>
      <button onClick={handleComplete}
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 glow-accent">
        Start Practicing <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>,
  ]

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-lg relative">
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-accent' : i < step ? 'w-4 bg-accent/50' : 'w-4 bg-border'}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
      </div>
    </div>
  )
}
