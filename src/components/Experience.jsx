import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Briefcase, Check } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import { experience } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

export default function Experience() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 45%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 })
  const left = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionLabel index="03" label="Experience" />
        <RevealText
          as="h2"
          className="heading"
          lines={['Learning by building,', 'alongside a team.']}
          accentLines={[1]}
        />

        <div className="xp" ref={trackRef}>
          <div className="xp__track" aria-hidden="true">
            <span className="xp__rail" />
            <motion.span className="xp__fill" style={{ scaleX: progress }} />
            <motion.span className="xp__head" style={{ left }}>
              <span />
            </motion.span>
            {experience.months.map((m, i) => (
              <span
                key={m}
                className={`xp__tick ${i === 0 ? 'xp__tick--first' : ''} ${
                  i === experience.months.length - 1 ? 'xp__tick--last' : ''
                }`}
                style={{ left: `${(i / (experience.months.length - 1)) * 100}%` }}
              >
                <i />
                <em>{m}</em>
              </span>
            ))}
          </div>

          <motion.article
            className="xp__card glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="xp__card-top">
              <span className="xp__icon">
                <Briefcase size={22} />
              </span>
              <div>
                <h3>{experience.role}</h3>
                <p className="xp__company">{experience.company}</p>
              </div>
              <time className="xp__period">{experience.period}</time>
            </div>
            <ul className="xp__points">
              {experience.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.12 }}
                >
                  <Check size={16} />
                  {p}
                </motion.li>
              ))}
            </ul>
            <div className="tags">
              {experience.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
