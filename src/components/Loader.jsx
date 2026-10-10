import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Loader({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 350 : 1400)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  return (
    <motion.div
      className="loader"
      role="status"
      aria-label="Loading portfolio"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.div
        className="loader__inner"
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease }}
      >
        <svg className="loader__mark" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8b7cf6" />
              <stop offset="1" stopColor="#2f6bff" />
            </linearGradient>
          </defs>
          <motion.path
            d="M62 20 V60 C62 74 54 81 43 81 C35 81 29 77 26 70"
            fill="none"
            stroke="url(#loader-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease }}
          />
          <motion.circle
            cx="62"
            cy="20"
            r="5"
            fill="#ff7a85"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.75, type: 'spring', stiffness: 300, damping: 14 }}
          />
        </svg>
        <motion.span
          className="loader__name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease }}
        >
          Shaik Jasmine
        </motion.span>
        <span className="loader__bar">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0.3 : 1.25, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </motion.div>
  )
}
