import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import { stats } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

function Counter({ value, from = 0, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotion()
  const format = (v) => `${v.toFixed(decimals)}${suffix}`

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) {
      ref.current.textContent = format(value)
      return
    }
    const controls = animate(from, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} aria-label={format(value)}>
      {format(from)}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionLabel index="01" label="About" />
        <div className="about__grid">
          <div className="about__left">
            <RevealText
              as="h2"
              className="display"
              lines={['Curious by nature.', 'Builder by choice.']}
              accentLines={[1]}
            />
          </div>
          <motion.div
            className="about__right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <p className="lead">
              I&apos;m <strong>Shaik Jasmine</strong>, a Computer Science Engineering graduate who
              enjoys turning ideas into practical software. My foundation is in Java, SQL and web
              technologies — and I&apos;ve applied it to everything from a railway reservation system
              to a deep-learning model that reads stress from heart rate variability.
            </p>
            <div className="edu-card glass">
              <div className="edu-card__icon">
                <GraduationCap size={22} />
              </div>
              <dl>
                <div>
                  <dt>Degree</dt>
                  <dd>B.Tech Computer Science &amp; Engineering</dd>
                </div>
                <div>
                  <dt>Institution</dt>
                  <dd>
                    Geethanjali Institute of Science and Technology
                    <span className="muted">
                      <MapPin size={13} /> Nellore
                    </span>
                  </dd>
                </div>
                <div className="edu-card__row">
                  <div>
                    <dt>CGPA</dt>
                    <dd>8.28</dd>
                  </div>
                  <div>
                    <dt>Years</dt>
                    <dd>2020–2024</dd>
                  </div>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        <ul className="stats">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="stat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            >
              <span className="stat__value">
                <Counter {...s} />
              </span>
              <span className="stat__label">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
