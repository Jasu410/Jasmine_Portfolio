import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel.jsx'
import { languages, softSkills } from '../data/content.js'

const ease = [0.22, 1, 0.36, 1]

function SplitWord({ word }) {
  return (
    <span className="lang__word" aria-label={word}>
      {[...word].map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ '--i': i }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Beyond() {
  return (
    <section id="beyond" className="section beyond">
      <div className="container beyond__grid">
        <div className="lang">
          <SectionLabel index="06" label="Languages I speak" />
          <ul className="lang__list">
            {languages.map((l, i) => (
              <motion.li
                key={l.name}
                className="lang__item"
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease, delay: i * 0.12 }}
              >
                <span className="lang__index">0{i + 1}</span>
                <SplitWord word={l.name} />
                {l.native !== l.name && (
                  <span className="lang__native" lang={l.name === 'Telugu' ? 'te' : 'hi'}>
                    {l.native}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="soft">
          <SectionLabel index="07" label="How I work" />
          <motion.div
            className="orbit"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease }}
          >
            <span className="orbit__ring" aria-hidden="true" />
            <span className="orbit__ring orbit__ring--inner" aria-hidden="true" />
            <div className="orbit__center">
              <span>Soft</span>
              <span>skills</span>
            </div>
            <ul className="orbit__track">
              {softSkills.map((s, i) => (
                <li key={s} className="orbit__item" style={{ '--a': `${(360 / softSkills.length) * i}deg` }}>
                  <span className="orbit__chip" tabIndex={0}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
