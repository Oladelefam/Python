import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label: string
  color?: string
  showValue?: boolean
}

export default function ProgressBar({ value, max = 100, label, color = '#3b82f6', showValue = true }: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        {showValue && <span className="text-sm font-semibold text-text-primary">{value}</span>}
      </div>
      <div className="h-2 bg-border/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
