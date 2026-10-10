import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import { education } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

export default function Education() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })

  return (
    <section id="education" className="section education">
      <div className="container">
        <SectionLabel index="05" label="Education" />
        <RevealText as="h2" className="heading" lines={['The path that', 'shaped the builder.']} accentLines={[1]} />

        <ol className="edu" ref={ref}>
          <span className="edu__rail" aria-hidden="true">
            <motion.span style={{ scaleY: fill }} />
          </span>
          {education.map((e, i) => (
            <motion.li
              key={e.title}
              className={`edu__item ${i % 2 ? 'edu__item--right' : ''}`}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease }}
            >
              <span className="edu__node" aria-hidden="true" />
              <div className="edu__card glass">
                <span className="edu__year" aria-hidden="true">
                  {e.year}
                </span>
                <span className="edu__period">{e.period}</span>
                <h3>{e.title}</h3>
                <p>{e.school}</p>
                <span className="edu__score">{e.score}</span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
