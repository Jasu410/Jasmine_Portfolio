import { motion } from 'framer-motion'

export default function SectionLabel({ index, label }) {
  return (
    <motion.div
      className="section-label"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-label__index">{index}</span>
      <span className="section-label__line" />
      <span>{label}</span>
    </motion.div>
  )
}
