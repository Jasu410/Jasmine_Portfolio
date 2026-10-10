import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import HRVVisual from './HRVVisual.jsx'
import RailwayVisual from './RailwayVisual.jsx'
import { GithubIcon } from '../Icons.jsx'
import { profile } from '../../data/content.js'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.documentElement.classList.add('modal-open')

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = panelRef.current.querySelectorAll('button, a[href]')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('modal-open')
      prev?.focus?.()
    }
  }, [onClose])

  const isHrv = project.id === 'hrv'

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
        initial={{ opacity: 0, y: 80, scale: 0.96, clipPath: 'inset(8% 8% 8% 8% round 40px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
        exit={{ opacity: 0, y: 60, scale: 0.97 }}
        transition={{ duration: 0.7, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        <header className="modal__head">
          <span className="modal__index">Project {project.index}</span>
          <h2 id={`modal-title-${project.id}`}>{project.title}</h2>
          <p className="lead">{project.description}</p>
          <div className="tags">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="modal__visual">
          {isHrv ? (
            <HRVVisual pipeline={project.pipeline} large />
          ) : (
            <RailwayVisual stations={project.stations} large />
          )}
        </div>

        <div className="modal__grid">
          <section>
            <h3>{isHrv ? 'The process' : 'Highlights'}</h3>
            <ul className="modal__list">
              {project.details.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, ease }}
                >
                  <span className="modal__list-num">0{i + 1}</span>
                  {d}
                </motion.li>
              ))}
            </ul>
          </section>
          <section>
            {isHrv ? (
              <>
                <h3>How it flows</h3>
                <ol className="modal__flow">
                  {project.pipeline.map((p) => (
                    <li key={p.label}>
                      <strong>{p.label}</strong>
                      <span>{p.description}</span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <>
                <h3>Impact</h3>
                <div className="modal__metrics">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="metric">
                      <span className="metric__value">{h.value}</span>
                      <span className="metric__label">{h.label}</span>
                    </div>
                  ))}
                </div>
                <ul className="modal__checks">
                  <li>
                    <Check size={16} /> Duplicate booking prevention
                  </li>
                  <li>
                    <Check size={16} /> Built with Java, HTML, CSS and SQL
                  </li>
                </ul>
              </>
            )}
          </section>
        </div>

        <footer className="modal__foot">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            <GithubIcon size={18} /> Browse my GitHub <ArrowUpRight size={16} />
          </a>
          <button className="btn btn--primary" onClick={onClose}>
            Back to projects
          </button>
        </footer>
      </motion.div>
    </motion.div>
  )
}
