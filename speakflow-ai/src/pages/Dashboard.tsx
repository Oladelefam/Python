import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, Flame, TrendingUp, Clock, ArrowRight, Sparkles, Target, Award } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/ui/Card'
import ScoreRing from '../components/ui/ScoreRing'
import { PROMPTS } from '../lib/types'

export default function Dashboard() {
  const { profile, sessions } = useAuth()
  const lastSession = sessions[0]
  const recentSessions = sessions.slice(0, 5)
  const quickPrompts = PROMPTS.slice(0, 4)

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-text-secondary mt-1">Ready to level up your speaking skills?</p>
        </div>
        <Link to="/record" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 glow-accent self-start">
          <Mic className="w-5 h-5" /> Start Practice
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Day Streak', value: profile?.streak_count || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { icon: Target, label: 'Sessions', value: profile?.total_sessions || 0, color: 'text-accent', bg: 'bg-accent-glow' },
          { icon: Clock, label: 'Minutes', value: profile?.total_practice_minutes || 0, color: 'text-teal', bg: 'bg-teal-glow' },
          { icon: Award, label: 'Best Score', value: profile?.best_score || 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Last Session</h2>
              {lastSession && <Link to="/results" className="text-sm text-accent hover:text-accent-light flex items-center gap-1">View Details <ArrowRight className="w-4 h-4" /></Link>}
            </div>
            {lastSession ? (
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <ScoreRing score={lastSession.overall_score} size={140} color="#3b82f6" />
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Confidence', score: lastSession.confidence_score, color: '#14b8a6' },
                      { label: 'Eye Contact', score: lastSession.eye_contact_score, color: '#10b981' },
                      { label: 'Vocal Clarity', score: lastSession.vocal_clarity_score, color: '#f59e0b' },
                      { label: 'Engagement', score: lastSession.engagement_score, color: '#ef4444' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-text-secondary flex-1">{item.label}</span>
                        <span className="text-sm font-semibold text-text-primary">{item.score}</span>
                      </div>
                    ))}
                  </div>
                  {lastSession.ai_feedback?.summary && (
                    <div className="bg-bg-primary/50 rounded-xl p-4 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-text-primary">AI Coach</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{lastSession.ai_feedback.summary}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-accent-glow flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No sessions yet</h3>
                <p className="text-text-secondary mb-4">Start your first practice to see your scores here.</p>
                <Link to="/record" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 rounded-xl transition-all">
                  <Mic className="w-4 h-4" /> Start Practice
                </Link>
              </div>
            )}
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Start</h2>
          <div className="space-y-3">
            {quickPrompts.map((prompt) => (
              <Link key={prompt.id} to="/record" state={{ prompt }}
                className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary/50 hover:bg-bg-card-hover border border-transparent hover:border-border transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent-glow flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary">{prompt.title}</div>
                  <div className="text-xs text-text-muted truncate">{prompt.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Sessions</h2>
            <Link to="/progress" className="text-sm text-accent hover:text-accent-light flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-text-muted pb-3 pr-4">Date</th>
                  <th className="text-left text-xs font-medium text-text-muted pb-3 pr-4">Prompt</th>
                  <th className="text-left text-xs font-medium text-text-muted pb-3 pr-4">Duration</th>
                  <th className="text-left text-xs font-medium text-text-muted pb-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 text-sm text-text-secondary">{new Date(session.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="py-3 pr-4 text-sm text-text-primary capitalize">{session.prompt_type}</td>
                    <td className="py-3 pr-4 text-sm text-text-secondary">{Math.floor(session.duration_seconds / 60)}:{String(session.duration_seconds % 60).padStart(2, '0')}</td>
                    <td className="py-3">
                      <span className={`text-sm font-semibold ${session.overall_score >= 80 ? 'text-emerald-400' : session.overall_score >= 60 ? 'text-warning' : 'text-error'}`}>{session.overall_score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {sessions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gradient-to-r from-accent/10 to-teal/10 border-accent/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-glow flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-text-primary">Track Your Progress</h3>
                <p className="text-sm text-text-secondary">View detailed analytics and improvement trends over time.</p>
              </div>
              <Link to="/progress" className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 rounded-xl transition-all flex-shrink-0">
                View Analytics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
