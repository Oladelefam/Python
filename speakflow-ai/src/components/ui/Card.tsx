import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  glow?: 'accent' | 'success' | 'warning' | 'error' | 'teal' | 'none'
}

const glowMap = {
  accent: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  success: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  warning: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
  error: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]',
  teal: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]',
  none: '',
}

export default function Card({ children, className = '', hover = false, onClick, glow = 'none' }: CardProps) {
  return (
    <motion.div
      className={`bg-bg-card border border-border rounded-2xl p-5 ${hover ? `cursor-pointer transition-all duration-300 hover:border-border-light hover:bg-bg-card-hover ${glowMap[glow]}` : ''} ${className}`}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
