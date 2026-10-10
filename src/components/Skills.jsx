import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from './SectionLabel.jsx'
import RevealText from './RevealText.jsx'
import { skillGroups } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]
const SPREAD = 36 // degrees between skills in the same group

export default function Skills() {
  const nodes = useMemo(
    () =>
      skillGroups.flatMap((group, g) =>
        group.skills.map((skill, i) => {
          const angle = ((-90 + g * 120 + (i - 1) * SPREAD) * Math.PI) / 180
          const radius = skill.prominent ? 35 : 38
          return {
            ...skill,
            group,
            x: 50 + Math.cos(angle) * radius,
            y: 50 + Math.sin(angle) * radius,
            delay: (g * 3 + i) * 0.4,
          }
        }),
      ),
    [],
  )
  const groupLabels = skillGroups.map((group, g) => {
    const angle = ((-90 + g * 120) * Math.PI) / 180
    return { ...group, x: 50 + Math.cos(angle) * 20, y: 50 + Math.sin(angle) * 20 }
  })

  const [active, setActive] = useState('Java')
  const current = nodes.find((n) => n.name === active)

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionLabel index="02" label="Skills" />
        <div className="skills__head">
          <RevealText as="h2" className="heading" lines={['A small, connected', 'ecosystem of tools.']} accentLines={[1]} />
          <p className="muted skills__hint">Hover, tap or tab through a skill to explore how it fits in.</p>
        </div>

        <div className="skills__layout">
          <motion.div
            className="eco"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
          >
            <svg className="eco__lines" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="38" className="eco__orbit" />
              <circle cx="50" cy="50" r="20" className="eco__orbit eco__orbit--inner" />
              {nodes.map((n) => {
                const isActive = n.name === active
                const sibling = current && n.group.id === current.group.id
                return (
                  <line
                    key={n.name}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    className={`eco__line ${isActive ? 'is-active' : sibling ? 'is-sibling' : ''}`}
                    style={{ '--c': n.group.color }}
                  />
                )
              })}
              {skillGroups.map((group) => {
                const members = nodes.filter((n) => n.group.id === group.id)
                const on = current?.group.id === group.id
                return members.slice(1).map((n, i) => (
                  <line
                    key={`${group.id}-${i}`}
                    x1={members[i].x}
                    y1={members[i].y}
                    x2={n.x}
                    y2={n.y}
                    className={`eco__link ${on ? 'is-on' : ''}`}
                    style={{ '--c': group.color }}
                  />
                ))
              })}
            </svg>

            {groupLabels.map((g) => (
              <span
                key={g.id}
                className={`eco__group ${current?.group.id === g.id ? 'is-on' : ''}`}
                style={{ left: `${g.x}%`, top: `${g.y}%`, '--c': g.color }}
                aria-hidden="true"
              >
                {g.label}
              </span>
            ))}

            <div className="eco__center">
              <span className="eco__center-pulse" />
              <span className="eco__center-name">Jasmine</span>
              <span className="eco__center-sub">core</span>
            </div>

            {nodes.map((n) => (
              <button
                key={n.name}
                type="button"
                className={`eco__node ${n.prominent ? 'eco__node--prominent' : ''} ${
                  n.name === active ? 'is-active' : ''
                } ${current && n.group.id === current.group.id ? 'is-sibling' : ''}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, '--c': n.group.color, '--d': `${n.delay}s` }}
                onMouseEnter={() => setActive(n.name)}
                onFocus={() => setActive(n.name)}
                onClick={() => setActive(n.name)}
                aria-pressed={n.name === active}
                aria-describedby="skill-detail"
              >
                <span className="eco__node-inner">{n.name}</span>
              </button>
            ))}
          </motion.div>

          <div className="skill-detail glass" id="skill-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <span className="skill-detail__group" style={{ '--c': current.group.color }}>
                    {current.group.label}
                  </span>
                  <h3 className="skill-detail__name">{current.name}</h3>
                  <p>{current.description}</p>
                  <div className="skill-detail__related">
                    <span className="muted">Connected</span>
                    {current.group.skills
                      .filter((s) => s.name !== current.name)
                      .map((s) => (
                        <button key={s.name} type="button" className="chip" onClick={() => setActive(s.name)}>
                          {s.name}
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="skill-legend">
              {skillGroups.map((g) => (
                <li key={g.id} style={{ '--c': g.color }}>
                  <span />
                  {g.label}
                  <em>{g.skills.map((s) => s.name).join(' · ')}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
