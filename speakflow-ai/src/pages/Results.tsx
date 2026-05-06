import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip,
} from 'recharts'
import { ArrowLeft, Sparkles, CheckCircle2, AlertTriangle, Dumbbell, Mic, TrendingUp, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { generateAnalysis } from '../lib/analysis'
import type { Session } from '../lib/types'
import Card from '../components/ui/Card'
import ScoreRing from '../components/ui/ScoreRing'
import ProgressBar from '../components/ui/ProgressBar'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, sessions, refreshSessions, refreshProfile } = useAuth()
  const [session, setSession] = useState<Omit<Session, 'id' | 'user_id' | 'created_at'> | null>(null)
  const [saved, setSaved] = useState(false)

  const durationSeconds = (location.state as { duration?: number })?.duration || 60

  useEffect(() => {
    setSession(generateAnalysis(durationSeconds))
  }, [durationSeconds])

  useEffect(() => {
    if (!session || saved || !user) return
    const doSave = async () => {
      await supabase.from('sessions').insert({ ...session, user_id: user.id }).select().single()
      const totalSessions = (sessions.length || 0) + 1
      const totalMinutes = Math.round(((sessions.reduce((s, x) => s + x.duration_seconds, 0) || 0) + session.duration_seconds) / 60)
      const bestScore = Math.max(...sessions.map((s) => s.overall_score), session.overall_score)
      await supabase.from('profiles').update({ total_sessions: totalSessions, total_practice_minutes: totalMinutes, best_score: bestScore }).eq('id', user.id)
      setSaved(true)
      refreshSessions()
      refreshProfile()
    }
    doSave()
  }, [session, saved, user, sessions, refreshSessions, refreshProfile])

  if (!session) {
    return <div className="flex items-center justify-center min-h-[60vh]"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><Sparkles className="w-8 h-8 text-accent" /></motion.div></div>
  }

  const radarData = [
    { metric: 'Confidence', value: session.confidence_score },
    { metric: 'Eye Contact', value: session.eye_contact_score },
    { metric: 'Vocal Clarity', value: session.vocal_clarity_score },
    { metric: 'Engagement', value: session.engagement_score },
    { metric: 'Pace', value: session.pace_score },
    { metric: 'Energy', value: session.energy_score },
    { metric: 'Posture', value: session.posture_score },
  ]

  const scoreColor = session.overall_score >= 80 ? '#10b981' : session.overall_score >= 60 ? '#f59e0b' : '#ef4444'
  const recentScores = [...sessions.slice(0, 9).reverse(), { created_at: 'Now', overall_score: session.overall_score }]
  const trendData = recentScores.map((s, i) => ({ name: i === recentScores.length - 1 ? 'Now' : `#${i + 1}`, score: s.overall_score }))

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center hover:border-border-light transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Session Results</h1>
            <p className="text-sm text-text-secondary">{Math.floor(session.duration_seconds / 60)}:{String(session.duration_seconds % 60).padStart(2, '0')} duration</p>
          </div>
        </div>
        <Link to="/record" className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 rounded-xl transition-all">
          <Mic className="w-4 h-4" /> Practice Again
        </Link>
      </div>

      {/* Overall Score + Radar */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center py-8">
          <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Overall Score</h2>
          <ScoreRing score={session.overall_score} size={180} strokeWidth={10} color={scoreColor} />
          <p className="text-sm text-text-secondary mt-4">
            {session.overall_score >= 80 ? 'Excellent performance!' : session.overall_score >= 60 ? 'Good job, keep improving!' : 'Great effort, practice makes perfect!'}
          </p>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Skill Breakdown</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(37, 39, 56, 0.8)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Score Bars */}
      <Card>
        <h2 className="text-sm font-semibold text-text-secondary mb-5 uppercase tracking-wider">Detailed Scores</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {[
            { label: 'Confidence', score: session.confidence_score, color: '#14b8a6' },
            { label: 'Eye Contact', score: session.eye_contact_score, color: '#3b82f6' },
            { label: 'Vocal Clarity', score: session.vocal_clarity_score, color: '#f59e0b' },
            { label: 'Engagement', score: session.engagement_score, color: '#ef4444' },
            { label: 'Pace', score: session.pace_score, color: '#8b5cf6' },
            { label: 'Energy', score: session.energy_score, color: '#10b981' },
            { label: 'Posture', score: session.posture_score, color: '#ec4899' },
          ].map((item) => (
            <ProgressBar key={item.label} label={item.label} value={item.score} color={item.color} />
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
          <span className="text-sm text-text-secondary">Filler Words Detected:</span>
          <span className="text-sm font-semibold text-text-primary">{session.filler_word_count}</span>
        </div>
      </Card>

      {/* Trend Chart */}
      {sessions.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Score Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <XAxis dataKey="name" stroke="#6b7194" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#6b7194" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#181924', border: '1px solid #252738', borderRadius: '12px', color: '#f0f1f5' }} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* AI Feedback */}
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-accent-glow flex items-center justify-center"><Sparkles className="w-4 h-4 text-accent" /></div>
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">AI Coach Feedback</h2>
        </div>
        <p className="text-text-secondary leading-relaxed mb-6">{session.ai_feedback?.summary}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-success-glow/50 border border-success/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="w-4 h-4 text-success" /><h3 className="text-sm font-semibold text-success">What You Did Well</h3></div>
            <ul className="space-y-2">{session.strengths.map((s, i) => <li key={i} className="text-sm text-text-secondary leading-relaxed">{s}</li>)}</ul>
          </div>
          <div className="bg-warning-glow/50 border border-warning/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-warning" /><h3 className="text-sm font-semibold text-warning">Areas to Improve</h3></div>
            <ul className="space-y-2">{session.improvements.map((s, i) => <li key={i} className="text-sm text-text-secondary leading-relaxed">{s}</li>)}</ul>
          </div>
          <div className="bg-accent-glow/50 border border-accent/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><Dumbbell className="w-4 h-4 text-accent" /><h3 className="text-sm font-semibold text-accent">Suggested Exercises</h3></div>
            <ul className="space-y-2">{session.exercises.map((s, i) => <li key={i} className="text-sm text-text-secondary leading-relaxed">{s}</li>)}</ul>
          </div>
        </div>
      </Card>

      {/* Individual Feedback */}
      <Card>
        <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Detailed AI Insights</h2>
        <div className="space-y-4">
          {Object.entries(session.ai_feedback || {}).filter(([key]) => key !== 'summary').map(([key, feedback]) => (
            <div key={key} className="bg-bg-primary/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary capitalize mb-2">{key.replace('_', ' ')}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feedback}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-accent/10 to-teal/10 border-accent/20">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-accent-glow flex items-center justify-center flex-shrink-0"><TrendingUp className="w-7 h-7 text-accent" /></div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-text-primary">Keep the momentum going</h3>
            <p className="text-sm text-text-secondary">Practice consistently to see improvement over time.</p>
          </div>
          <Link to="/record" className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 rounded-xl transition-all flex-shrink-0">
            Practice Again <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>
    </div>
  )
}
