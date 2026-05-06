import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      className={`bg-bg-card border border-border rounded-2xl p-5 ${hover ? 'cursor-pointer transition-all duration-300 hover:border-border-light hover:bg-bg-card-hover' : ''} ${className}`}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
