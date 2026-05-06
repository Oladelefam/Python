import type { Session } from './types'

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function generateAnalysis(durationSeconds: number): Omit<Session, 'id' | 'user_id' | 'created_at'> {
  const baseScore = rand(55, 85)

  const confidence = clamp(baseScore + rand(-15, 20), 20, 98)
  const eyeContact = clamp(baseScore + rand(-10, 15), 25, 97)
  const vocalClarity = clamp(baseScore + rand(-12, 18), 30, 96)
  const engagement = clamp(baseScore + rand(-8, 12), 35, 95)
  const pace = clamp(baseScore + rand(-15, 10), 30, 95)
  const energy = clamp(baseScore + rand(-10, 20), 25, 98)
  const posture = clamp(baseScore + rand(-12, 15), 30, 96)

  const overall = Math.round(
    confidence * 0.2 + eyeContact * 0.15 + vocalClarity * 0.15 +
    engagement * 0.15 + pace * 0.1 + energy * 0.1 + posture * 0.15
  )

  const fillerWords = rand(0, Math.max(1, Math.floor(durationSeconds / 15)))

  const strengths = buildStrengths(confidence, eyeContact, vocalClarity, engagement, energy, posture)
  const improvements = buildImprovements(confidence, eyeContact, vocalClarity, engagement, pace, energy, posture)
  const exercises = buildExercises()
  const aiFeedback = buildAIFeedback(overall, confidence, eyeContact, vocalClarity, engagement)

  return {
    prompt_type: 'free',
    prompt_text: '',
    duration_seconds: durationSeconds,
    overall_score: clamp(overall, 10, 99),
    confidence_score: clamp(confidence, 10, 99),
    eye_contact_score: clamp(eyeContact, 10, 99),
    vocal_clarity_score: clamp(vocalClarity, 10, 99),
    engagement_score: clamp(engagement, 10, 99),
    pace_score: clamp(pace, 10, 99),
    filler_word_count: fillerWords,
    energy_score: clamp(energy, 10, 99),
    posture_score: clamp(posture, 10, 99),
    ai_feedback: aiFeedback,
    strengths,
    improvements,
    exercises,
  }
}

function buildStrengths(confidence: number, eyeContact: number, vocal: number, engagement: number, energy: number, posture: number): string[] {
  const pool: string[] = []
  if (confidence >= 70) pool.push('You projected strong confidence throughout your speech')
  if (eyeContact >= 70) pool.push('Your eye contact was consistent and engaging')
  if (vocal >= 70) pool.push('Your voice was clear and well-articulated')
  if (engagement >= 70) pool.push('You kept the audience engaged with your delivery')
  if (energy >= 70) pool.push('Your energy level was impressive and infectious')
  if (posture >= 70) pool.push('Your posture conveyed authority and presence')
  if (pool.length === 0) pool.push('You completed the session, which is a great first step')
  return pool.slice(0, 3)
}

function buildImprovements(confidence: number, eyeContact: number, vocal: number, engagement: number, pace: number, energy: number, posture: number): string[] {
  const pool: string[] = []
  if (confidence < 65) pool.push('Work on projecting more confidence through your voice and body language')
  if (eyeContact < 65) pool.push('Try to maintain more consistent eye contact with your audience')
  if (vocal < 65) pool.push('Focus on clearer articulation and vocal variety')
  if (engagement < 65) pool.push('Add more pauses and emphasis to keep listeners engaged')
  if (pace < 65) pool.push('Try slowing down slightly during key points for impact')
  if (energy < 65) pool.push('Bring more energy and enthusiasm to your delivery')
  if (posture < 65) pool.push('Stand taller and use open gestures to convey confidence')
  if (pool.length === 0) pool.push('Fine-tune your delivery for even more polish')
  return pool.slice(0, 3)
}

function buildExercises(): string[] {
  const pool = [
    'Practice the "power pause" - pause for 2 seconds before key statements',
    'Record yourself reading a paragraph and focus on vocal variety',
    'Stand in front of a mirror and practice maintaining eye contact',
    'Try the "elevator pitch" exercise - explain something in 30 seconds',
    'Practice speaking with a pen in your mouth to improve articulation',
    'Read aloud for 5 minutes daily, focusing on pace and clarity',
    'Practice the "3-2-1" technique: 3 points, 2 examples, 1 conclusion',
    'Try impromptu speaking: pick a random topic and speak for 1 minute',
  ]
  return pool.slice(0, 3)
}

function buildAIFeedback(overall: number, confidence: number, eyeContact: number, vocal: number, engagement: number): Record<string, string> {
  const messages: Record<string, string> = {}

  if (confidence >= 75) {
    messages.confidence = 'You maintained strong confidence throughout your speech. Your self-assurance was evident in your delivery.'
  } else if (confidence >= 50) {
    messages.confidence = 'Your confidence is building. Try power posing before your next session to boost your presence.'
  } else {
    messages.confidence = 'Focus on building confidence through preparation and practice. Remember: you know more than you think.'
  }

  if (eyeContact >= 75) {
    messages.eye_contact = 'Excellent eye contact! You kept a natural, engaging gaze that connected with your audience.'
  } else {
    messages.eye_contact = 'Try slowing down slightly during key points. Look at different sections of your audience to build connection.'
  }

  if (vocal >= 75) {
    messages.vocal = 'Your voice was clear and well-modulated. Great use of vocal variety to keep listeners engaged.'
  } else {
    messages.vocal = 'Work on vocal clarity by practicing tongue twisters and reading aloud with emphasis on consonants.'
  }

  if (engagement >= 75) {
    messages.engagement = 'You kept your audience engaged with dynamic delivery and natural transitions.'
  } else {
    messages.engagement = 'Add more pauses and emphasis to key points. Vary your pace to create interest and anticipation.'
  }

  messages.summary = overall >= 80
    ? 'Outstanding session! You demonstrated strong speaking skills across multiple dimensions. Keep pushing to elite levels.'
    : overall >= 60
    ? `Solid performance with a score of ${overall}/100. You have a strong foundation - focus on the specific areas below to level up.`
    : `Good effort! Every session builds your skills. Your score of ${overall}/100 shows room for growth, and the exercises below will help.`

  return messages
}
