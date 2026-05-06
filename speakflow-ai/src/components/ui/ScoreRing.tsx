import { motion } from 'framer-motion'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  label?: string
  color?: string
  showValue?: boolean
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  color = '#3b82f6',
  showValue = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(37, 39, 56, 0.5)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{score}</span>
          </div>
        )}
      </div>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </div>
  )
}
