import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mic, Eye, BarChart3, Sparkles, ArrowRight, Play, Target, TrendingUp, Shield } from 'lucide-react'

const features = [
  { icon: Eye, title: 'AI Eye Tracking', description: 'Real-time analysis of your eye contact patterns and gaze direction.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Mic, title: 'Voice Analysis', description: 'Measure pace, volume, clarity, and detect filler words automatically.', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { icon: BarChart3, title: 'Performance Scores', description: 'Get detailed scores across 8 dimensions of effective speaking.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Sparkles, title: 'AI Coach', description: 'Receive personalized feedback and exercises tailored to your needs.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: TrendingUp, title: 'Progress Tracking', description: 'Watch your skills improve over time with detailed analytics.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { icon: Shield, title: 'Private & Secure', description: 'Your recordings stay on your device. Analysis happens in real-time.', color: 'text-violet-400', bg: 'bg-violet-500/10' },
]

const stats = [
  { value: '50K+', label: 'Sessions Completed' },
  { value: '92%', label: 'User Improvement' },
  { value: '4.9', label: 'App Rating' },
  { value: '12min', label: 'Avg. Daily Practice' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary">SpeakFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-4 py-2">Sign In</Link>
            <Link to="/signup" className="text-sm font-medium bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-accent-glow border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Speaking Coach</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-text-primary leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Master the Art of<br /><span className="gradient-text">Public Speaking</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Practice with AI-powered feedback. Improve your confidence, clarity, and presence with every session. Your personal speaking coach, available anytime.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/signup" className="group flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 glow-accent">
              Start Free Practice
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 text-text-secondary hover:text-text-primary font-medium px-8 py-4 rounded-2xl border border-border hover:border-border-light transition-all duration-300">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </motion.div>

          {/* Mock UI Preview */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-text-muted">SpeakFlow AI - Session Results</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Overall', score: 87, color: '#3b82f6' },
                  { label: 'Confidence', score: 82, color: '#14b8a6' },
                  { label: 'Eye Contact', score: 91, color: '#10b981' },
                  { label: 'Clarity', score: 78, color: '#f59e0b' },
                ].map((item) => (
                  <div key={item.label} className="bg-bg-primary/50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.score}</div>
                    <div className="text-xs text-text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-bg-primary/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-text-primary">AI Coach</span>
                </div>
                <p className="text-sm text-text-secondary">"You maintained strong eye contact throughout. Try slowing down slightly during key points for more impact."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Everything you need to speak with confidence</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">Our AI analyzes 8 dimensions of your speaking performance to give you actionable, personalized feedback.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:border-border-light transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">How it works</h2>
            <p className="text-lg text-text-secondary">Three simple steps to become a better speaker.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', icon: Target, title: 'Choose a Prompt', desc: 'Pick from introductions, pitches, stories, or free practice.' },
              { step: '2', icon: Mic, title: 'Record Yourself', desc: 'Speak while our AI tracks your delivery in real-time.' },
              { step: '3', icon: TrendingUp, title: 'Get Feedback', desc: 'Receive detailed scores and personalized coaching tips.' },
            ].map((item, i) => (
              <motion.div key={item.step} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="w-16 h-16 rounded-2xl bg-accent-glow border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-semibold text-accent mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Ready to find your voice?</h2>
            <p className="text-lg text-text-secondary mb-8">Join thousands improving their speaking skills with AI-powered coaching.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 glow-accent">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center"><Mic className="w-3 h-3 text-white" /></div>
            <span className="text-sm font-semibold text-text-primary">SpeakFlow AI</span>
          </div>
          <p className="text-xs text-text-muted">Built for those who want to be heard.</p>
        </div>
      </footer>
    </div>
  )
}
