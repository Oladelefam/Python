import { motion } from 'framer-motion'
import {
  ResponsiveContainer, Line, XAxis, YAxis, Tooltip,
  AreaChart, Area, BarChart, Bar,
} from 'recharts'
import { TrendingUp, Calendar, Target, Flame, Clock, ArrowRight, Mic } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/ui/Card'
import ScoreRing from '../components/ui/ScoreRing'

export default function Progress() {
  const { sessions, profile } = useAuth()

  const sortedSessions = [...sessions].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  const scoreTrend = sortedSessions.map((s, i) => ({
    name: `#${i + 1}`,
    overall: s.overall_score,
    confidence: s.confidence_score,
    eyeContact: s.eye_contact_score,
  }))

  const weeklyData = (() => {
    const weeks: Record<string, { count: number; avgScore: number; minutes: number }> = {}
    sortedSessions.forEach((s) => {
      const d = new Date(s.created_at)
      const weekStart = new Date(d)
      weekStart.setDate(d.getDate() - d.getDay())
      const key = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (!weeks[key]) weeks[key] = { count: 0, avgScore: 0, minutes: 0 }
      weeks[key].count++
      weeks[key].avgScore += s.overall_score
      weeks[key].minutes += Math.round(s.duration_seconds / 60)
    })
    return Object.entries(weeks).map(([name, data]) => ({
      name,
      sessions: data.count,
      avgScore: Math.round(data.avgScore / data.count),
      minutes: data.minutes,
    }))
  })()

  const skillAverages = (() => {
    if (sessions.length === 0) return []
    const skills = [
      { key: 'confidence_score', label: 'Confidence', color: '#14b8a6' },
      { key: 'eye_contact_score', label: 'Eye Contact', color: '#3b82f6' },
      { key: 'vocal_clarity_score', label: 'Vocal Clarity', color: '#f59e0b' },
      { key: 'engagement_score', label: 'Engagement', color: '#ef4444' },
      { key: 'pace_score', label: 'Pace', color: '#8b5cf6' },
      { key: 'energy_score', label: 'Energy', color: '#10b981' },
      { key: 'posture_score', label: 'Posture', color: '#ec4899' },
    ]
    return skills.map((s) => ({
      ...s,
      avg: Math.round(sessions.reduce((sum, x) => sum + ((x as unknown) as Record<string, number>)[s.key], 0) / sessions.length),
    }))
  })()

  const firstScore = sortedSessions[0]?.overall_score
  const latestScore = sortedSessions[sortedSessions.length - 1]?.overall_score
  const improvement = firstScore && latestScore ? latestScore - firstScore : 0
  const totalMinutes = profile?.total_practice_minutes || 0

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Progress</h1>
          <p className="text-text-secondary mt-1">Track your improvement over time</p>
        </div>
        <Link to="/record" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 self-start">
          <Mic className="w-5 h-5" /> New Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <Card className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-accent-glow flex items-center justify-center mx-auto mb-4"><TrendingUp className="w-8 h-8 text-accent" /></div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">No sessions yet</h2>
          <p className="text-text-secondary mb-6">Complete a practice session to start tracking your progress.</p>
          <Link to="/record" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 rounded-xl transition-all">
            <Mic className="w-4 h-4" /> Start Practicing
          </Link>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, label: 'Total Sessions', value: sessions.length, color: 'text-accent', bg: 'bg-accent-glow' },
              { icon: Clock, label: 'Total Minutes', value: totalMinutes, color: 'text-teal', bg: 'bg-teal-glow' },
              { icon: Flame, label: 'Day Streak', value: profile?.streak_count || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { icon: TrendingUp, label: 'Improvement', value: improvement > 0 ? `+${improvement}` : improvement, color: improvement >= 0 ? 'text-emerald-400' : 'text-error', bg: improvement >= 0 ? 'bg-emerald-500/10' : 'bg-error-glow' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Score Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={scoreTrend}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7194" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#6b7194" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#181924', border: '1px solid #252738', borderRadius: '12px', color: '#f0f1f5' }} />
                <Area type="monotone" dataKey="overall" stroke="#3b82f6" fill="url(#scoreGrad)" strokeWidth={2} />
                <Line type="monotone" dataKey="confidence" stroke="#14b8a6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="eyeContact" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-2">
              {[{ label: 'Overall', color: '#3b82f6', dash: false }, { label: 'Confidence', color: '#14b8a6', dash: true }, { label: 'Eye Contact', color: '#10b981', dash: true }].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-4 h-0.5 ${item.dash ? 'border-t border-dashed' : ''}`} style={{ borderColor: item.color, backgroundColor: item.dash ? 'transparent' : item.color }} />
                  <span className="text-xs text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#6b7194" fontSize={10} />
                  <YAxis stroke="#6b7194" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#181924', border: '1px solid #252738', borderRadius: '12px', color: '#f0f1f5' }} />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Skill Averages</h2>
              <div className="space-y-4">
                {skillAverages.map((skill) => (
                  <div key={skill.label} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color }} />
                    <span className="text-sm text-text-secondary flex-1">{skill.label}</span>
                    <div className="w-32 h-2 bg-border/50 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: skill.color }} initial={{ width: 0 }} animate={{ width: `${skill.avg}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                    </div>
                    <span className="text-sm font-semibold text-text-primary w-8 text-right">{skill.avg}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {sortedSessions.length >= 2 && (
            <Card>
              <h2 className="text-sm font-semibold text-text-secondary mb-6 uppercase tracking-wider">Before vs After</h2>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-center"><ScoreRing score={firstScore} size={100} color="#6b7194" label="First Session" /></div>
                <div className="flex flex-col items-center gap-2">
                  <ArrowRight className="w-8 h-8 text-accent" />
                  <span className={`text-lg font-bold ${improvement >= 0 ? 'text-emerald-400' : 'text-error'}`}>{improvement >= 0 ? '+' : ''}{improvement}</span>
                  <span className="text-xs text-text-muted">points</span>
                </div>
                <div className="text-center"><ScoreRing score={latestScore} size={100} color="#3b82f6" label="Latest Session" /></div>
              </div>
            </Card>
          )}

          <Card>
            <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Session History</h2>
            <div className="space-y-3">
              {sessions.slice(0, 10).map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-3 rounded-xl bg-bg-primary/50 hover:bg-bg-card-hover transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent-glow flex items-center justify-center flex-shrink-0"><Calendar className="w-4 h-4 text-accent" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary capitalize">{session.prompt_type || 'Free Practice'}</div>
                    <div className="text-xs text-text-muted">{new Date(session.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${session.overall_score >= 80 ? 'text-emerald-400' : session.overall_score >= 60 ? 'text-warning' : 'text-error'}`}>{session.overall_score}</div>
                    <div className="text-xs text-text-muted">{Math.floor(session.duration_seconds / 60)}:{String(session.duration_seconds % 60).padStart(2, '0')}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
