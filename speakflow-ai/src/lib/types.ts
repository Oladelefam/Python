export interface Profile {
  id: string
  full_name: string
  avatar_url: string
  streak_count: number
  total_sessions: number
  total_practice_minutes: number
  best_score: number
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  user_id: string
  prompt_type: string
  prompt_text: string
  duration_seconds: number
  overall_score: number
  confidence_score: number
  eye_contact_score: number
  vocal_clarity_score: number
  engagement_score: number
  pace_score: number
  filler_word_count: number
  energy_score: number
  posture_score: number
  ai_feedback: Record<string, string>
  strengths: string[]
  improvements: string[]
  exercises: string[]
  created_at: string
}

export interface Achievement {
  id: string
  user_id: string
  type: string
  title: string
  description: string
  icon: string
  earned_at: string
}

export type PromptCategory = 'introduction' | 'pitch' | 'story' | 'interview' | 'persuasive' | 'free'

export interface Prompt {
  id: string
  category: PromptCategory
  title: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const PROMPTS: Prompt[] = [
  { id: '1', category: 'introduction', title: 'Introduce Yourself', description: 'Give a confident self-introduction as if meeting a new team', icon: 'hand-metal', difficulty: 'beginner' },
  { id: '2', category: 'pitch', title: 'Pitch a Product', description: 'Present a product idea to potential investors in 60 seconds', icon: 'rocket', difficulty: 'intermediate' },
  { id: '3', category: 'story', title: 'Tell a Story', description: 'Share a personal story that connects with your audience', icon: 'book-open', difficulty: 'beginner' },
  { id: '4', category: 'interview', title: 'Answer an Interview Question', description: 'Respond to "Tell me about a time you overcame a challenge"', icon: 'briefcase', difficulty: 'intermediate' },
  { id: '5', category: 'persuasive', title: 'Make a Persuasive Argument', description: 'Convince your audience about a cause you believe in', icon: 'megaphone', difficulty: 'advanced' },
  { id: '6', category: 'free', title: 'Free Practice', description: 'Speak freely on any topic to practice your delivery', icon: 'mic', difficulty: 'beginner' },
]

export const ACHIEVEMENT_DEFS = [
  { type: 'first_session', title: 'First Steps', description: 'Complete your first practice session', icon: 'footprints' },
  { type: 'streak_3', title: 'On a Roll', description: 'Maintain a 3-day streak', icon: 'flame' },
  { type: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'flame' },
  { type: 'streak_30', title: 'Unstoppable', description: 'Maintain a 30-day streak', icon: 'flame' },
  { type: 'score_80', title: 'Rising Star', description: 'Score 80+ on a session', icon: 'star' },
  { type: 'score_90', title: 'Elite Speaker', description: 'Score 90+ on a session', icon: 'crown' },
  { type: 'sessions_10', title: 'Dedicated', description: 'Complete 10 practice sessions', icon: 'target' },
  { type: 'sessions_50', title: 'Committed', description: 'Complete 50 practice sessions', icon: 'award' },
  { type: 'minutes_60', title: 'Hour Power', description: 'Accumulate 60 minutes of practice', icon: 'clock' },
  { type: 'perfect_eye', title: 'Eagle Eye', description: 'Score 95+ on eye contact', icon: 'eye' },
  { type: 'no_fillers', title: 'Smooth Talker', description: 'Zero filler words in a session', icon: 'sparkles' },
] as const
