import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flame, Target, Clock, Award, Trophy, Star, Eye, Sparkles, Crown, Footprints, Mic, ChevronRight, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/ui/Card'
import ScoreRing from '../components/ui/ScoreRing'
import { ACHIEVEMENT_DEFS } from '../lib/types'

const ACHIEVEMENT_ICONS: Record<string, typeof Trophy> = {
  trophy: Trophy, star: Star, eye: Eye, sparkles: Sparkles, crown: Crown, footprints: Footprints, flame: Flame, target: Target, award: Award, clock: Clock,
}

export default function Profile() {
  const { profile, sessions, signOut } = useAuth()

  const earnedTypes = new Set<string>()
  if (profile) {
    if (profile.total_sessions >= 1) earnedTypes.add('first_session')
    if (profile.total_sessions >= 10) earnedTypes.add('sessions_10')
    if (profile.total_sessions >= 50) earnedTypes.add('sessions_50')
    if (profile.total_practice_minutes >= 60) earnedTypes.add('minutes_60')
    if (profile.best_score >= 80) earnedTypes.add('score_80')
    if (profile.best_score >= 90) earnedTypes.add('score_90')
    if (profile.streak_count >= 3) earnedTypes.add('streak_3')
    if (profile.streak_count >= 7) earnedTypes.add('streak_7')
    if (profile.streak_count >= 30) earnedTypes.add('streak_30')
  }
  sessions.forEach((s) => {
    if (s.eye_contact_score >= 95) earnedTypes.add('perfect_eye')
    if (s.filler_word_count === 0 && s.duration_seconds > 0) earnedTypes.add('no_fillers')
  })

  const avgScore = sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.overall_score, 0) / sessions.length) : 0

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Profile</h1>

      {/* Profile Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-accent/20 to-teal/20" />
        <div className="relative pt-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-accent/20 border-2 border-accent/30 flex items-center justify-center">
            <span className="text-3xl font-bold text-accent">{profile?.full_name?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-text-primary">{profile?.full_name || 'User'}</h2>
            <p className="text-sm text-text-secondary">Speaking since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'today'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center"><div className="text-2xl font-bold text-text-primary">{profile?.total_sessions || 0}</div><div className="text-xs text-text-muted">Sessions</div></div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center"><div className="text-2xl font-bold text-text-primary">{avgScore}</div><div className="text-xs text-text-muted">Avg Score</div></div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center"><div className="text-2xl font-bold text-accent">{profile?.streak_count || 0}</div><div className="text-xs text-text-muted">Streak</div></div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Total Sessions', value: profile?.total_sessions || 0, color: 'text-accent', bg: 'bg-accent-glow' },
          { icon: Clock, label: 'Practice Time', value: `${profile?.total_practice_minutes || 0}m`, color: 'text-teal', bg: 'bg-teal-glow' },
          { icon: Flame, label: 'Best Streak', value: profile?.streak_count || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { icon: Crown, label: 'Best Score', value: profile?.best_score || 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
              <div><div className="text-xl font-bold text-text-primary">{stat.value}</div><div className="text-xs text-text-muted">{stat.label}</div></div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Skill Overview */}
      {sessions.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary mb-5 uppercase tracking-wider">Skill Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Confidence', score: Math.round(sessions.reduce((s, x) => s + x.confidence_score, 0) / sessions.length), color: '#14b8a6' },
              { label: 'Eye Contact', score: Math.round(sessions.reduce((s, x) => s + x.eye_contact_score, 0) / sessions.length), color: '#3b82f6' },
              { label: 'Vocal Clarity', score: Math.round(sessions.reduce((s, x) => s + x.vocal_clarity_score, 0) / sessions.length), color: '#f59e0b' },
              { label: 'Engagement', score: Math.round(sessions.reduce((s, x) => s + x.engagement_score, 0) / sessions.length), color: '#ef4444' },
            ].map((skill) => (
              <ScoreRing key={skill.label} score={skill.score} size={90} strokeWidth={6} color={skill.color} label={skill.label} />
            ))}
          </div>
        </Card>
      )}

      {/* Achievements */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Achievements</h2>
          <span className="text-xs text-text-muted">{earnedTypes.size}/{ACHIEVEMENT_DEFS.length} earned</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ACHIEVEMENT_DEFS.map((achievement) => {
            const earned = earnedTypes.has(achievement.type)
            const IconComp = ACHIEVEMENT_ICONS[achievement.icon] || Trophy
            return (
              <motion.div key={achievement.type}
                className={`p-4 rounded-xl border transition-all ${earned ? 'bg-accent-glow/50 border-accent/20' : 'bg-bg-primary/30 border-border/50 opacity-40'}`}
                whileHover={earned ? { scale: 1.02 } : undefined}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${earned ? 'bg-accent/20' : 'bg-border/30'}`}>
                  <IconComp className={`w-5 h-5 ${earned ? 'text-accent' : 'text-text-muted'}`} />
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${earned ? 'text-text-primary' : 'text-text-muted'}`}>{achievement.title}</h3>
                <p className="text-xs text-text-muted">{achievement.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="space-y-2">
          <Link to="/record" className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-card-hover transition-colors">
            <div className="w-9 h-9 rounded-lg bg-accent-glow flex items-center justify-center"><Mic className="w-4 h-4 text-accent" /></div>
            <span className="text-sm font-medium text-text-primary flex-1">Start Practice</span>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </Link>
          <Link to="/progress" className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-card-hover transition-colors">
            <div className="w-9 h-9 rounded-lg bg-teal-glow flex items-center justify-center"><Target className="w-4 h-4 text-teal" /></div>
            <span className="text-sm font-medium text-text-primary flex-1">View Progress</span>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </Link>
          <button onClick={signOut} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-card-hover transition-colors w-full">
            <div className="w-9 h-9 rounded-lg bg-error-glow flex items-center justify-center"><LogOut className="w-4 h-4 text-error" /></div>
            <span className="text-sm font-medium text-text-primary flex-1">Sign Out</span>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>
        </div>
      </Card>
    </div>
  )
}
